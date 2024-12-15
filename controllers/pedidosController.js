const usuarios_pedidos = require('../models');

// Funcion para crear un nuevo pedido
exports.createPedido = async (req, res) => {
    const { id_usuario, descripcion_pedido, fecha_pedido } = req.body;
    if (!descripcion_pedido || !fecha_pedido) {
        return res.status(400).send({ message: 'Debe llenar el pedido' });
    } else {
        try {
            const pedido = await usuarios_pedidos.sequelize.models.usuarios_pedidos.create({
                id_usuario: id_usuario,
                descripcion_pedido: descripcion_pedido,
                fecha_pedido: fecha_pedido,
                estado_pedido: 'P',
                estado: 'A'
            });
            return res.status(201).send({ message: 'Solicitud creada correctamente', pedido: pedido });
        } catch (error) {
            return res.status(500).send({ message: 'Error en el servidor', error: error });
        }
    }
};

// Funcion para obtener todos los pedidos
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await usuarios_pedidos.sequelize.query(`
            SELECT 
                up.*,
                u.nombres AS nombres_usuario,
                u.apellidos AS apellidos_usuario,
                e.nombre_empresa AS nombre_empresa,
                COALESCE(u_actualizacion.username, '') AS usuario_asignado
            FROM
                usuarios_pedidos up
            INNER JOIN
                usuarios u ON up.id_usuario = u.id_usuario
            INNER JOIN
                empresas e ON u.id_empresa = e.id_empresa
            LEFT JOIN
                usuarios u_actualizacion ON up.id_usuario_asignado = u_actualizacion.id_usuario
            WHERE
                up.estado = 'A'`,
            { type: usuarios_pedidos.sequelize.QueryTypes.SELECT }
            );
        return res.status(200).send(pedidos);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener la cantidad de pedidos por estado_pedido
exports.getPedidosCountByStatus = async (req, res) => {
    const { estado_pedido } = req.query;
    try {
        const pedidosEstado = await usuarios_pedidos.sequelize.query(`
            SELECT
                COUNT(up.estado_pedido) AS cantidad_pedidos
            FROM
                usuarios_pedidos up
            WHERE
                up.estado_pedido = '${estado_pedido}'
                AND up.estado = 'A'
            GROUP BY
                up.estado_pedido`,
            { type: usuarios_pedidos.sequelize.QueryTypes.SELECT }
            );
            if (pedidosEstado.length === 0) {
                return res.status(404).send({ message: 'No se encontraron pedidos' });
            } else {
                return res.status(200).send(pedidosEstado);
            }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener los pedidos dependiendo su estado
exports.getPedidosByStatus = async (req, res) => {
    const { estado_pedido } = req.query;
    try {
        const pedidos = await usuarios_pedidos.sequelize.models.usuarios_pedidos.findAll({
            where: {
                estado_pedido: estado_pedido
            }
        });
        return res.status(200).send({ pedidos: pedidos });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar el estado de un pedido
exports.updatePedidoStatus = async (req, res) => {
    const { id_usuario_pedido, estado_pedido, fecha_actualizacion } = req.body;
    try {
        const pedidoEstadoNuevo = await usuarios_pedidos.sequelize.models.usuarios_pedidos.update({
            estado_pedido: estado_pedido,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_usuario_pedido: id_usuario_pedido
            }
        });
        if (pedidoEstadoNuevo > 0) {
            return res.status(200).send({ message: 'Pedido actualizado correctamente', pedido: pedidoEstadoNuevo});
        } else {
            return res.status(404).send({ message: 'Error actualizando el pedido'});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener los pedidos de un usuario
exports.getAllPedidosByUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página
    const { id_usuario } = req.query;

    try {
        // Consulta para obtener la cantidad total de pedidos por usuario
        const totalPedidosUser = await usuarios_pedidos.sequelize.models.usuarios_pedidos.count({
            where: {
                estado: 'A',
                id_usuario: id_usuario
            }
        });

        const totalPages = Math.ceil(totalPedidosUser / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allPedidosUser = await usuarios_pedidos.sequelize.query(`
            SELECT 
                up.*,
                u.nombres AS nombres_usuario,
                u.apellidos AS apellidos_usuario,
                e.nombre_empresa AS nombre_empresa  
            FROM
                usuarios_pedidos up
            INNER JOIN
                usuarios u ON up.id_usuario = u.id_usuario
            INNER JOIN
                empresas e ON u.id_empresa = e.id_empresa
            WHERE
                up.estado = 'A' AND
                up.id_usuario = ${id_usuario}
            ORDER BY
                up.id_usuario_pedido DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: usuarios_pedidos.sequelize.QueryTypes.SELECT }
        );
        if (allPedidosUser.length === 0) {
            return res.status(404).send({ message: 'No se encontraron pedidos del usuario' });
        } else {
            return res.status(200).json({
                totalPedidosUser: totalPedidosUser,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                pedidosUser: allPedidosUser,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para inactivar un pedido
exports.deletePedido = async (req, res) => {
    const { id_usuario_pedido } = req.body;
    try {
        const pedidoEliminado = await usuarios_pedidos.sequelize.models.usuarios_pedidos.update({
            estado: 'I'
        }, {
            where: {
                id_usuario_pedido: id_usuario_pedido
            }
        });
        if (pedidoEliminado > 0) {
            return res.status(200).send({ message: 'Pedido eliminado correctamente', pedido: pedidoEliminado});
        } else {
            return res.status(404).send({ message: 'Error eliminando el pedido'});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar el usuario_actualziacion de un pedido
exports.updatePedidoUser = async (req, res) => {
    const { id_usuario_pedido, id_usuario_asignado, fecha_actualizacion } = req.body;
    try {
        const pedidoActualizado = await usuarios_pedidos.sequelize.models.usuarios_pedidos.update({
            id_usuario_asignado: id_usuario_asignado,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_usuario_pedido: id_usuario_pedido
            }
        });
        if (pedidoActualizado > 0) {
            return res.status(200).send({ message: 'Usuario Asignado actualizado correctamente', pedido: pedidoActualizado});
        } else {
            return res.status(404).send({ message: 'Error asignando el usuario'});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};