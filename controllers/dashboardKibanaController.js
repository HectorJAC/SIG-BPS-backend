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
                e.nombre_empresa as nombre_empresa,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                dashboard_kibana dk
            INNER JOIN
                empresas e
            ON
                dk.id_empresa = e.id_empresa
            LEFT JOIN
                usuarios u_insercion ON dk.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON dk.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                dk.estado = 'A'
            ORDER BY
                dk.id_dashboard_kibana DESC
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
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { search, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de roles
        const totalDashboards = await dashboard_kibana.sequelize.models.dashboard_kibana.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalDashboards / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento
        
        const allDashboards = await dashboard_kibana.sequelize.query(`
            SELECT
                dk.id_dashboard_kibana AS id_dashboard_kibana,
                dk.nombre_dashboard AS nombre_dashboard,
                dk.dashboard_source AS dashboard_source,
                dk.estado AS estado,
                dk.fecha_insercion AS fecha_insercion,
                COALESCE(dk.fecha_actualizacion, '') AS fecha_actualizacion,
                e.id_empresa AS id_empresa,
                e.nombre_empresa AS nombre_empresa,
                COALESCE(u.id_usuario, '') AS id_usuario,
                COALESCE(u.username, '') AS username,
                COALESCE(u.nombres, '') AS nombres_usuario,
                COALESCE(u.apellidos, '') AS apellidos_usuario,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                dashboard_kibana dk
            LEFT JOIN
                empresas e ON dk.id_empresa = e.id_empresa
            LEFT JOIN
                usuarios_dashboard ud ON dk.id_dashboard_kibana = ud.id_dashboard_kibana
            LEFT JOIN
                usuarios u ON ud.id_usuario = u.id_usuario
            LEFT JOIN
                usuarios u_insercion ON dk.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON dk.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                dk.id_dashboard_kibana LIKE '%${search}%' OR
                dk.nombre_dashboard LIKE '%${search}%' OR
                e.id_empresa LIKE '%${search}%' OR
                e.nombre_empresa LIKE '%${search}%' OR
                u.id_usuario LIKE '%${search}%' OR
                u.username LIKE '%${search}%' OR
                u.nombres LIKE '%${search}%' OR
                u.apellidos LIKE '%${search}%' AND
                dk.estado = '${estado}'
            ORDER BY
                dk.id_dashboard_kibana DESC
            LIMIT
                ${limit} OFFSET ${offset}`, 
            { type: dashboard_kibana.sequelize.QueryTypes.SELECT } 
        );
        if (allDashboards.length === 0) {
            return res.status(404).send({ message: 'No se encontraron dashboards' });
        } else {
            return res.status(200).json({
                totalDashboards: totalDashboards,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                dashboards: allDashboards
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener los datos de un dashboard
exports.getDashboard = async (req, res) => {
    const { id_dashboard_kibana } = req.query;
    try {
        const dashboard = await dashboard_kibana.sequelize.query(`
            SELECT
                dk.*,
                e.nombre_empresa AS nombre_empresa
            FROM
                dashboard_kibana dk
            INNER JOIN
                empresas e
            ON
                dk.id_empresa = e.id_empresa
            WHERE
                dk.id_dashboard_kibana = ${id_dashboard_kibana}`,
            { type: dashboard_kibana.sequelize.QueryTypes.SELECT }
        );
        if (dashboard.length === 0) {
            return res.status(404).send({ message: 'No se encontró el dashboard' });
        } else {
            return res.status(200).json(dashboard[0]);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para crear un nuevo dashboard
exports.createDashboard = async (req, res) => {
    const { nombre_dashboard, dashboard_source, id_empresa, usuario_insercion, fecha_insercion } = req.body;
    try {
        const newDashboard = await dashboard_kibana.sequelize.models.dashboard_kibana.create({
            nombre_dashboard: nombre_dashboard,
            dashboard_source: dashboard_source,
            id_empresa: id_empresa,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion,
            estado: 'A'
        });
        return res.status(201).send({ message: 'Dashboard creado', dashboard: newDashboard });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar un dashboard
exports.updateDashboard = async (req, res) => {
    const { 
        id_dashboard_kibana, 
        nombre_dashboard, 
        dashboard_source, 
        id_empresa, 
        usuario_actualizacion, 
        fecha_actualizacion
    } = req.body;
    try {
        const dashboard = await dashboard_kibana.sequelize.models.dashboard_kibana.update({
            id_dashboard_kibana: id_dashboard_kibana,
            nombre_dashboard: nombre_dashboard,
            dashboard_source: dashboard_source,
            id_empresa: id_empresa,
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion,
            estado: 'A'
        }, {
            where: {
                id_dashboard_kibana: id_dashboard_kibana
            }
        });
        if (dashboard == 1) {
            return res.status(200).send({ message: 'Dashboard actualizado' });
        } else {
            return res.status(404).send({ message: 'Dashboard no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Función para obtener todos los dashboards que pertenecen a un usuario paginados
exports.getUserDashboardPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { id_usuario, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de roles
        const totalDashboards = await usuarios_dashboard.sequelize.models.usuarios_dashboard.count({
            where: {
                estado: estado,
                id_usuario: id_usuario
            }
        });

        const totalPages = Math.ceil(totalDashboards / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const dashboardsUsuario = await usuarios_dashboard.sequelize.query(`
            SELECT
                ud.*,
                dk.nombre_dashboard,
                dk.dashboard_source,
                dk.estado AS estado_dashboard
            FROM
                usuarios_dashboard ud
            JOIN
                dashboard_kibana dk 
            ON 
                ud.id_dashboard_kibana = dk.id_dashboard_kibana
            WHERE
                ud.id_usuario = ${id_usuario} AND
                ud.estado = '${estado}'
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: usuarios_dashboard.sequelize.QueryTypes.SELECT }
            );
        if (dashboardsUsuario.length === 0) {
            return res.status(404).send({ message: 'No se encontraron dashboards para el usuario' });
        } else {
            return res.status(200).json({
                totalDashboards: totalDashboards,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                dashboardsUsuario: dashboardsUsuario,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para inactivar un registro de la tabla usuarios_dashboard
exports.inactivateUserDashboard = async (req, res) => {
    const { id_usuario_dashboard, usuario_actualizacion, fecha_actualizacion } = req.body;
    try {
        const dashboard = await usuarios_dashboard.sequelize.models.usuarios_dashboard.update({
            estado: 'I',
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_usuario_dashboard: id_usuario_dashboard
            }
        });
        if (dashboard > 0) {
            return res.status(200).send({ message: 'Dashboard eliminado correctamente' });
        } else {
            return res.status(404).send({ message: 'Dashboard no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para agregar un nuevo registro en la tabla usuarios_dashboard
exports.addUserDashboard = async (req, res) => {
    const { id_usuario, id_dashboard_kibana, usuario_insercion, fecha_insercion } = req.body;
    try {
        const newDashboard = await usuarios_dashboard.sequelize.models.usuarios_dashboard.create({
            id_usuario: id_usuario,
            id_dashboard_kibana: id_dashboard_kibana,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion,
            estado: 'A'
        });
        return res.status(201).send({ message: 'Dashboard agregado al usuario', dashboard: newDashboard });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};