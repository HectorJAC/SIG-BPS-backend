const empresas = require('../models');

// Funcion para buscar todas las empresas
exports.findAllCompany = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de empresas
        const totalCompanies = await empresas.sequelize.models.empresas.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalCompanies / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const Allcompanies = await empresas.sequelize.query(`
            SELECT
                *
            FROM
                empresas
            WHERE
                estado = 'A'
            ORDER BY
                id_empresa
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
