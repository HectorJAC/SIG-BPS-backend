const empresas = require('../models');
const usuarios = require('../models');

// Funcion para buscar todas las empresas
exports.findAllCompany = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página
    const { estado } = req.query;

    try {
        // Consulta para obtener la cantidad total de empresas
        const totalCompanies = await empresas.sequelize.models.empresas.count({
            where: {
                estado: estado
            }
        });

        const totalPages = Math.ceil(totalCompanies / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const Allcompanies = await empresas.sequelize.query(`
            SELECT
                e.*,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                empresas e
            LEFT JOIN
                usuarios u_insercion ON e.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON e.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                e.estado = '${estado}'
            ORDER BY
                e.id_empresa DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: empresas.sequelize.QueryTypes.SELECT }
        );
        if (Allcompanies.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empresas registradas' });
        } else {
            return res.status(200).json({
                totalCompanies: totalCompanies,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                empresas: Allcompanies,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todas las empresas sin paginacion
exports.findAllCompanyWithoutPagination = async (req, res) => {
    try {
        const allCompanies = await empresas.sequelize.models.empresas.findAll({
            where: {
                estado: 'A'
            }
        });
        if (allCompanies.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empresas registradas' });
        } else {
            return res.status(200).send(allCompanies);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener los datos de una sola empresa segun su id
exports.getCompanyById = async (req, res) => {
    const {id_empresa} = req.query;

    try {
        const company = await empresas.sequelize.models.empresas.findOne({
            where: {
                id_empresa: id_empresa
            }
        });
        if (company) {
            return res.status(200).send(company);
        } else {
            return res.status(404).send({ message: 'No se encontro la empresa' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear una nueva empresa
exports.createCompany = async (req, res) => {
    const { 
        nombre_empresa,
        rnc_empresa,
        telefono_empresa,
        usuario_insercion,
        fecha_insercion
    } = req.body;

    try {
        const newCompany = await empresas.sequelize.models.empresas.create({
            nombre_empresa: nombre_empresa,
            rnc_empresa: rnc_empresa,
            telefono_empresa: telefono_empresa,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion,
            estado: 'A'
        });
        if (newCompany) {
            return res.status(201).send({ message: 'Empresa creada correctamente', empresa: newCompany });
        } else {
            return res.status(400).send({ message: 'No se pudo crear la empresa' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar los datos de una empresa
exports.updateCompany = async (req, res) => {
    const { 
        id_empresa, 
        nombre_empresa,
        rnc_empresa,
        telefono_empresa,
        usuario_actualizacion,
        fecha_actualizacion
    } = req.body;

    try {
        const company = await empresas.sequelize.models.empresas.update({
            nombre_empresa: nombre_empresa,
            rnc_empresa: rnc_empresa,
            telefono_empresa: telefono_empresa,
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_empresa: id_empresa
            }
        });
        if (company) {
            return res.status(200).send({ message: 'Empresa actualizada correctamente', empresa: company });
        } else {
            return res.status(400).send({ message: 'No se pudo actualizar la empresa' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para cambiar de estado una empresa 
exports.changeStateCompany = async (req, res) => {
    const { 
        id_empresa,
        usuario_actualizacion,
        fecha_actualizacion, 
        estado 
    } = req.body;

    try {
        // Verificar si hay usuarios asociados a la empresa
        const usuariosAsociados = await usuarios.sequelize.models.usuarios.findAll({
            where: {
                id_empresa: id_empresa
            }
        });

        if (usuariosAsociados.length > 0 && estado === 'I') {
            return res.status(400).send({ 
                message: 'No se puede inactivar la empresa porque tiene usuarios asociados.' 
            });
        }

        const company = await empresas.sequelize.models.empresas.update({
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion,
            estado: estado
        }, {
            where: {
                id_empresa: id_empresa
            }
        });
        if (company) {
            return res.status(200).send({ message: 'Estado de la empresa actualizado correctamente', empresa: company });
        } else {
            return res.status(400).send({ message: 'No se pudo actualizar el estado de la empresa' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar una empresa por su id_empresa y/o nombre_empresa
exports.searchCompany = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { search, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de empresas
        const totalCompanies = await empresas.sequelize.models.empresas.count({
            where: {
                estado: estado
            }
        });

        const totalPages = Math.ceil(totalCompanies / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allCompanies = await empresas.sequelize.query(`
            SELECT
                e.*
            FROM
                empresas e
            WHERE
                (e.id_empresa LIKE '%${search}%' OR
                e.nombre_empresa LIKE '%${search}%') AND
                e.estado = '${estado}'
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: empresas.sequelize.QueryTypes.SELECT } 
        );
        if (allCompanies.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empresas' });
        } else {
            return res.status(200).json({
                totalCompanies: totalCompanies,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                empresas: allCompanies,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

