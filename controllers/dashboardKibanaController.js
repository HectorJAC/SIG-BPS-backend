const usuarios_dashboard = require('../models');

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