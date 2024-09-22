const roles = require('../models');

// Funcion para buscar todos los roles
exports.findAllRol = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de roles
        const totalRol = await roles.sequelize.models.roles.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalRol / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const AllRol = await roles.sequelize.query(`
            SELECT
                *
            FROM
                roles
            WHERE
                estado = 'A'
            ORDER BY
                id_rol
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: roles.sequelize.QueryTypes.SELECT }
        );
        if (AllRol.length === 0) {
            return res.status(404).send({ message: 'No se encontraron roles registrados' });
        } else {
            return res.status(200).json({
                totalRol: totalRol,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                roles: AllRol,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};
