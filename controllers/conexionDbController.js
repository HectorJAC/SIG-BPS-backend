const conexion_db = require('../models');

// Funcion para obtener todas las conexiones de base de datos de forma paginada
exports.getAllConexionDb = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de conexiones
        const totalConexions = await conexion_db.sequelize.models.conexion_db.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalConexions / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allConexions = await conexion_db.sequelize.query(`
            SELECT
                cdb.*,
                e.nombre_empresa
            FROM
                conexion_db cdb
            JOIN
                empresas e 
            ON 
                cdb.id_empresa = e.id_empresa
            WHERE
                cdb.estado = 'A'
            ORDER BY
                cdb.id_conexion_db
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: conexion_db.sequelize.QueryTypes.SELECT }
        );
        if (allConexions.length === 0) {
            return res.status(404).send({ message: 'No se encontraron conexiones de base de datos registradas' });
        } else {
            return res.status(200).json({
                totalConexions: totalConexions,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                conexions: allConexions,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener los datos de una sola conexion segun su id
exports.getConexionDbById = async (req, res) => {
    const {id_conexion_db} = req.query;

    try {
        const conexion = await conexion_db.sequelize.query(`
            SELECT
                cdb.*,
                e.nombre_empresa
            FROM
                conexion_db cdb
            JOIN
                empresas e 
            ON 
                cdb.id_empresa = e.id_empresa
            WHERE
                cdb.id_conexion_db = ${id_conexion_db}`,
            { type: conexion_db.sequelize.QueryTypes.SELECT }
        );
        if (conexion !== null) {
            return res.status(200).json(conexion[0]);
        } else {
            return res.status(404).send({ message: 'No se encontró la conexión de base de datos solicitada' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear una nueva conexion de base de datos
exports.createConexionDb = async (req, res) => {
    const {
        id_empresa,
        conexion_driver_library,
        conexion_driver_class,
        conexion_string,
        conexion_user,
        conexion_password
    } = req.body;

    try {
        const newConexion = await conexion_db.sequelize.models.conexion_db.create({
            id_empresa: id_empresa,
            conexion_driver_library: conexion_driver_library,
            conexion_driver_class: conexion_driver_class,
            conexion_string: conexion_string,
            conexion_user: conexion_user,
            conexion_password: conexion_password,
            estado: 'A'
        });
        if (newConexion) {
            return res.status(201).send({ message: 'Conexión de base de datos registrada correctamente', conexion: newConexion });
        } else {
            return res.status(400).send({ message: 'No se pudo registrar la conexión de base de datos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar los datos de una conexion de base de datos
exports.updateConexionDb = async (req, res) => {
    const {
        id_conexion_db,
        id_empresa,
        conexion_driver_library,
        conexion_driver_class,
        conexion_string,
        conexion_user,
        conexion_password
    } = req.body;

    try {
        const conexion = await conexion_db.sequelize.models.conexion_db.update({
            id_empresa: id_empresa,
            conexion_driver_library: conexion_driver_library,
            conexion_driver_class: conexion_driver_class,
            conexion_string: conexion_string,
            conexion_user: conexion_user,
            conexion_password: conexion_password
        }, {
            where: {
                id_conexion_db: id_conexion_db
            }
        });
        if (conexion) {
            return res.status(200).send({ message: 'Conexión de base de datos actualizada correctamente', conexion: conexion });
        } else {
            return res.status(400).send({ message: 'No se pudo actualizar la conexión de base de datos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};