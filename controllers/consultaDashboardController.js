const consulta_dashboard = require('../models');

// Funcion para obtener todas las consultas dashboard de un dashboard
exports.getAllConsultDashboardByDashboard = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { id_dashboard_kibana, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de roles
        const totalConsultaDashboards = await consulta_dashboard.sequelize.models.consulta_dashboard.count({
            where: {
                estado: estado,
                id_dashboard_kibana: id_dashboard_kibana
            }
        });
        
        const totalPages = Math.ceil(totalConsultaDashboards / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const consultaDashboardByDashboard = await consulta_dashboard.sequelize.query(`
            SELECT
                cd.id_consulta_dashboard,
                cd.id_dashboard_kibana,
                cd.id_consulta_extraccion,
                cd.fecha_insercion,
                cd.fecha_actualizacion,
                cd.estado,
                ce.type,
                ce.index_data,
                cel.hosts_elastic,
                dk.nombre_dashboard,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                consulta_dashboard cd
            JOIN
                consulta_extraccion ce 
            ON 
                cd.id_consulta_extraccion = ce.id_consulta_extraccion
            JOIN
                conexion_elastic cel
            ON
                ce.id_conexion_elastic = cel.id_conexion_elastic
            JOIN
                dashboard_kibana dk
            ON
                cd.id_dashboard_kibana = dk.id_dashboard_kibana
            LEFT JOIN
                usuarios u_insercion ON cd.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON cd.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                cd.estado = '${estado}' AND
                cd.id_dashboard_kibana = ${id_dashboard_kibana}
            ORDER BY
                cd.id_consulta_dashboard DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: consulta_dashboard.sequelize.QueryTypes.SELECT }            
        );
        if (consultaDashboardByDashboard.length === 0) {
            return res.status(404).send({ message: 'No se encontraron consultas asignadas al dashboard' });
        } else {
            return res.status(200).json({
                totalConsultaDashboards: totalConsultaDashboards,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                consultaDashboardByDashboard: consultaDashboardByDashboard,
            });
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para inactivar una consulta dashboard
exports.deleteConsultDashboard = async (req, res) => {
    const { id_consulta_dashboard, usuario_actualizacion, fecha_actualizacion } = req.body;
    try {
        const consultaDashboard = await consulta_dashboard.sequelize.models.consulta_dashboard.update({
            estado: 'I',
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_consulta_dashboard: id_consulta_dashboard
            }
        });
        if (consultaDashboard > 0) {
            return res.status(200).send({ message: 'Consulta Dashboard eliminada correctamente' });
        } else {
            return res.status(404).send({ message: 'Consulta Dashboard no encontrada' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para agregar una consulta dashboard
exports.addConsultDashboard = async (req, res) => {
    const { id_dashboard_kibana, id_consulta_extraccion, usuario_insercion, fecha_insercion } = req.body;
    try {
        const consultaDashboard = await consulta_dashboard.sequelize.models.consulta_dashboard.create({
            id_dashboard_kibana: id_dashboard_kibana,
            id_consulta_extraccion: id_consulta_extraccion,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion,
            estado: 'A'
        });
        if (consultaDashboard) {
            return res.status(200).send({ message: 'Consulta Dashboard creada correctamente' });
        } else {
            return res.status(404).send({ message: 'Error al crear la consulta dashboard' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para buscar una consulta perteneciente a un dashboard
exports.searchConsultaExtraccionDashboard = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { search, id_dashboard_kibana, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de roles
        const totalConsultaDashboards = await consulta_dashboard.sequelize.models.consulta_dashboard.count({
            where: {
                estado: estado,
                id_dashboard_kibana: id_dashboard_kibana
            }
        });
        
        const totalPages = Math.ceil(totalConsultaDashboards / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const consultaDashboardByDashboard = await consulta_dashboard.sequelize.query(`
            SELECT
                cd.id_consulta_dashboard,
                cd.id_dashboard_kibana,
                cd.id_consulta_extraccion,
                cd.fecha_insercion,
                cd.fecha_actualizacion,
                cd.estado,
                ce.type,
                ce.index_data,
                cel.hosts_elastic,
                dk.nombre_dashboard,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                consulta_dashboard cd
            JOIN
                consulta_extraccion ce 
            ON 
                cd.id_consulta_extraccion = ce.id_consulta_extraccion
            JOIN
                conexion_elastic cel
            ON
                ce.id_conexion_elastic = cel.id_conexion_elastic
            JOIN
                dashboard_kibana dk
            ON
                cd.id_dashboard_kibana = dk.id_dashboard_kibana
            LEFT JOIN
                usuarios u_insercion ON cd.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON cd.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                (ce.type LIKE '%${search}%' OR
                ce.index_data LIKE '%${search}%') AND
                cd.estado = '${estado}' AND
                cd.id_dashboard_kibana = ${id_dashboard_kibana}
            ORDER BY
                cd.id_consulta_dashboard DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: consulta_dashboard.sequelize.QueryTypes.SELECT }            
        );
        if (consultaDashboardByDashboard.length === 0) {
            return res.status(404).send({ message: 'No se encontraron consultas asignadas al dashboard' });
        } else {
            return res.status(200).json({
                totalConsultaDashboards: totalConsultaDashboards,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                consultaDashboardByDashboard: consultaDashboardByDashboard,
            });
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};