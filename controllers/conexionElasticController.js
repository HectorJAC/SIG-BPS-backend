const conexion_elastic = require('../models');
const consulta_extraccion = require('../models');

// Funcion para obtener todas las conexiones de elastic
exports.getAllElasticConnections = async (req, res) => {
    try {
        const elasticConnections = await conexion_elastic.sequelize.query(`
            SELECT 
                ce.*,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM 
                conexion_elastic ce
            LEFT JOIN
                usuarios u_insercion ON ce.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON ce.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                ce.estado = 'A'`,
            { type: conexion_elastic.sequelize.QueryTypes.SELECT }
        );
        if (elasticConnections.length === 0) {
            return res.status(404).send({ message: 'No se encontraron conexiones de ElasticSearch registradas' });
        } else {
            return res.status(200).send(elasticConnections);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear una nueva conexion de elastic
exports.createElasticConnection = async (req, res) => {
    const { 
        hosts_elastic,
        usuario_insercion,
        fecha_insercion
    } = req.body;

    try {
        const newElasticConexion = await conexion_elastic.sequelize.models.conexion_elastic.create({
            hosts_elastic: hosts_elastic,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion,
            estado: 'A'
        });
        if (newElasticConexion) {
            return res.status(201).send({ message: 'Conexion de ElasticSearch registrada correctamente', conexion_elastic: newElasticConexion });
        } else {
            return res.status(400).send({ message: 'No se pudo registrar la conexion de ElasticSearch' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para inactivar una conexion de elastic
exports.deleteElasticConnection = async (req, res) => {
    const { 
        id_conexion_elastic,
        usuario_actualizacion,
        fecha_actualizacion
    } = req.body;

    try {
        // Verificar si hay consultas de extraccion asociados a la conexion de elastic
        const consultaExtraccionAsociados = await consulta_extraccion.sequelize.models.consulta_extraccion.findAll({
            where: {
                id_conexion_elastic: id_conexion_elastic,
                estado: 'A'
            }
        });

        if (consultaExtraccionAsociados.length > 0) {
            return res.status(400).send({ 
                message: 'No se puede eliminar la conexion de ElasticSearch porque tiene consultas de extraccion asociadas.' 
            });
        }

        const deletedElasticConnection = await conexion_elastic.sequelize.models.conexion_elastic.update({
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion,
            estado: 'I'
        }, {
            where: {
                id_conexion_elastic: id_conexion_elastic
            }
        });
        if (deletedElasticConnection > 0) {
            return res.status(200).send({ message: 'Conexion de ElasticSearch eliminada correctamente' });
        } else {
            return res.status(400).send({ message: 'No se pudo eliminar la conexion de ElasticSearch' });
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener una conexion de elastic por id
exports.getElasticConnectionById = async (req, res) => {
    const { id_conexion_elastic } = req.query;
    try {
        const elasticConnection = await conexion_elastic.sequelize.query(`
            SELECT 
                ce.*,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM 
                conexion_elastic ce
            LEFT JOIN
                usuarios u_insercion ON ce.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON ce.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                ce.id_conexion_elastic = ${id_conexion_elastic}`,
            { type: conexion_elastic.sequelize.QueryTypes.SELECT }
        );
        if (elasticConnection.length === 0) {
            return res.status(404).send({ message: 'No se encontraron conexiones de ElasticSearch registradas' });
        } else {
            return res.status(200).send(elasticConnection[0]);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar una conexion elastic
exports.updateElasticConnection = async (req, res) => {
    const { 
        id_conexion_elastic,
        hosts_elastic,
        usuario_actualizacion,
        fecha_actualizacion
    } = req.body;

    try {
        const updatedElasticConnection = await conexion_elastic.sequelize.models.conexion_elastic.update({
            hosts_elastic: hosts_elastic,
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_conexion_elastic: id_conexion_elastic
            }
        });
        if (updatedElasticConnection > 0) {
            return res.status(200).send({ message: 'Conexion de ElasticSearch actualizada correctamente' });
        } else {
            return res.status(400).send({ message: 'No se pudo actualizar la conexion de ElasticSearch' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};