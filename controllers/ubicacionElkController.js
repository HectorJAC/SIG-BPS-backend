const elk_ubicacion = require('../models');

// Funcion para buscar todas las ubicaciones elk
exports.findAllElkUbication = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de ubicaciones elk
        const totalElkUbication = await elk_ubicacion.sequelize.models.elk_ubicacion.count();

        const totalPages = Math.ceil(totalElkUbication / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allElkUbicacion = await elk_ubicacion.sequelize.query(`
            SELECT
                eu.*,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                elk_ubicacion eu
            LEFT JOIN
                usuarios u_insercion ON eu.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON eu.usuario_actualizacion = u_actualizacion.id_usuario
            ORDER BY
                eu.id_elk_ubicacion
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: elk_ubicacion.sequelize.QueryTypes.SELECT }
        );
        if (allElkUbicacion.length === 0) {
            return res.status(404).send({ message: 'No se encontraron herramientas ELK registradas' });
        } else {
            return res.status(200).json({
                totalElkUbication: totalElkUbication,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                elkUbicacion: allElkUbicacion,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar una herramienta elk por su id o por su nombre
exports.searchElkUbication = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página
    const { search } = req.query;

    try {
        // Consulta para obtener la cantidad total de ubicaciones elk
        const totalElkUbication = await elk_ubicacion.sequelize.models.elk_ubicacion.count();

        const totalPages = Math.ceil(totalElkUbication / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allElkUbicacion = await elk_ubicacion.sequelize.query(`
            SELECT
                eu.id_elk_ubicacion AS id_elk_ubicacion,
                eu.nombre_elk AS nombre_elk,
                eu.ubicacion_elk AS ubicacion_elk,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion,
                eu.fecha_insercion AS fecha_insercion,
                eu.fecha_actualizacion AS fecha_actualizacion,
                eu.estado AS estado
            FROM
                elk_ubicacion eu
            LEFT JOIN
                usuarios u_insercion ON eu.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON eu.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                eu.id_elk_ubicacion LIKE '%${search}%' OR
                eu.nombre_elk LIKE '%${search}%' 
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: elk_ubicacion.sequelize.QueryTypes.SELECT }
        );
        if (allElkUbicacion.length === 0) {
            return res.status(404).send({ message: 'No se encontraro la herramienta ELK' });
        } else {
            return res.status(200).json({
                totalElkUbication: totalElkUbication,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                elkUbicacion: allElkUbicacion,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener los datos de una sola herramienta elk segun su id
exports.getElkById = async (req, res) => {
    const { id_elk_ubicacion } = req.query;

    try {
        const elkUbication = await elk_ubicacion.sequelize.models.elk_ubicacion.findOne({
            where: {
                id_elk_ubicacion: id_elk_ubicacion
            }
        });
        if (elkUbication) {
            return res.status(200).send(elkUbication);
        } else {
            return res.status(404).send({ message: 'No se encontro la herramienta elk' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar los datos de una herramienta elk
exports.updateElk = async (req, res) => {
    const { 
        id_elk_ubicacion, 
        ubicacion_elk,
        usuario_actualizacion,
        fecha_actualizacion
    } = req.body;

    try {
        const elkUbication = await elk_ubicacion.sequelize.models.elk_ubicacion.update({
            ubicacion_elk: ubicacion_elk,
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_elk_ubicacion: id_elk_ubicacion
            }
        });
        if (elkUbication) {
            return res.status(200).send({ 
                message: 'Ubicacion de herramienta ELK actualizada correctamente', 
                elkUbication: elkUbication 
            });
        } else {
            return res.status(400).send({ message: 'No se pudo actualizar la ubicacion de la herramienta elk' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};
