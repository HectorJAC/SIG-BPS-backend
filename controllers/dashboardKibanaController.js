const usuarios_dashboard = require('../models');
const dashboard_kibana = require('../models');

// Función para obtener todos los dashboards que pertenecen a un usuario
exports.getDashboardKibanaByUser = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const dashboardsUsuario = await usuarios_dashboard.sequelize.query(`
            SELECT
                ud.*,
                dk.nombre_dashboard,
                dk.dashboard_source
            FROM
                usuarios_dashboard ud
            JOIN
                dashboard_kibana dk 
            ON 
                ud.id_dashboard_kibana = dk.id_dashboard_kibana
            WHERE
                ud.id_usuario = ${id_usuario}`,
            { type: usuarios_dashboard.sequelize.QueryTypes.SELECT }
            );
        if (dashboardsUsuario.length === 0) {
            return res.status(404).send({ message: 'No se encontraron dashboards para el usuario' });
        } else {
            return res.status(200).send(dashboardsUsuario);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Función para obtener todos los dashboards
exports.getAllDashboards = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de roles
        const totalDashboards = await dashboard_kibana.sequelize.models.dashboard_kibana.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalDashboards / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const dashboards = await dashboard_kibana.sequelize.query(`
            SELECT
                dk.*,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                dashboard_kibana dk
            LEFT JOIN
                usuarios u_insercion ON dk.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON dk.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                dk.estado = 'A'
            ORDER BY
                dk.id_dashboard_kibana
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: dashboard_kibana.sequelize.QueryTypes.SELECT }
        );
        if (dashboards.length === 0) {
            return res.status(404).send({ message: 'No se encontraron dashboards registrados' });
        } else {
            return res.status(200).json({
                totalDashboards: totalDashboards,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                dashboards: dashboards,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar un dashboard por su id_dashboard_kibana, nombre_dashboard, id_empresa, nombre_empresa, id_usuario, nombre_usuario
exports.searchDashboard = async (req, res) => {
    const { search, estado } = req.query;
    try {
        const allDashboards = await dashboard_kibana.sequelize.query(`
            SELECT
                dk.id_dashboard_kibana AS id_dashboard_kibana,
                dk.nombre_dashboard AS nombre_dashboard,
                dk.dashboard_source AS dashboard_source,
                dk.estado AS estado,
                e.id_empresa AS id_empresa,
                e.nombre_empresa AS nombre_empresa,
                u.id_usuario AS id_usuario,
                u.username AS username,
                u.nombres AS nombres_usuario,
                u.apellidos AS apellidos_usuario
            FROM
                dashboard_kibana dk
            INNER JOIN
                empresas e ON dk.id_empresa = e.id_empresa
            INNER JOIN
                usuarios_dashboard ud ON dk.id_dashboard_kibana = ud.id_dashboard_kibana
            INNER JOIN
                usuarios u ON ud.id_usuario = u.id_usuario
            WHERE
                dk.id_dashboard_kibana LIKE '%${search}%' OR
                dk.nombre_dashboard LIKE '%${search}%' OR
                e.id_empresa LIKE '%${search}%' OR
                e.nombre_empresa LIKE '%${search}%' OR
                u.id_usuario LIKE '%${search}%' OR
                u.username LIKE '%${search}%' OR
                u.nombres LIKE '%${search}%' OR
                u.apellidos LIKE '%${search}%' AND
                dk.estado = '${estado}'`, 
            { type: dashboard_kibana.sequelize.QueryTypes.SELECT } 
        );
        if (allDashboards.length === 0) {
            return res.status(404).send({ message: 'No se encontraron dashboards' });
        } else {
            return res.status(200).json(allDashboards);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};