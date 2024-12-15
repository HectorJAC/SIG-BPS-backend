const consulta_extraccion = require('../models');
const fs = require('fs-extra');
const path = require('path');

// Funcion para obtener todas las consultas paginadas
exports.getAllConsultaExtraccion = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de conexiones
        const totalConsultas = await consulta_extraccion.sequelize.models.consulta_extraccion.count({
            where: {
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalConsultas / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allConsultaExtraccion = await consulta_extraccion.sequelize.query(`
            SELECT
                cet.*,
                cdb.id_conexion_db,
                e.nombre_empresa,
                ce.hosts_elastic,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                consulta_extraccion cet
            JOIN
                conexion_db cdb ON cet.id_conexion_db = cdb.id_conexion_db
            JOIN
                empresas e ON cdb.id_empresa = e.id_empresa
            JOIN
                conexion_elastic ce ON cet.id_conexion_elastic = ce.id_conexion_elastic
            LEFT JOIN
                usuarios u_insercion ON cet.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON cet.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                cet.estado = 'A'
            ORDER BY
                cet.id_consulta_extraccion DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: consulta_extraccion.sequelize.QueryTypes.SELECT }
        );
        if (allConsultaExtraccion.length === 0) {
            return res.status(404).send({ message: 'No se encontraron consultas de extraccion registradas' });
        } else {
            return res.status(200).json({
                totalConsultas: totalConsultas,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                consultas: allConsultaExtraccion,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener una consulta de extraccion por ID
exports.getConsultaExtraccionById = async (req, res) => {
    const { id_consulta_extraccion } = req.query;

    try {
        const consultaExtraccion = await consulta_extraccion.sequelize.query(`
            SELECT
                cet.*,
                cdb.id_conexion_db,
                cdb.conexion_driver_library,
                cdb.conexion_driver_class,
                cdb.conexion_string,
                cdb.conexion_user,
                cdb.conexion_password,
                e.nombre_empresa,
                ce.hosts_elastic,
                u_insercion.username AS usuario_insercion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM
                consulta_extraccion cet
            JOIN
                conexion_db cdb ON cet.id_conexion_db = cdb.id_conexion_db
            JOIN
                empresas e ON cdb.id_empresa = e.id_empresa
            JOIN
                conexion_elastic ce ON cet.id_conexion_elastic = ce.id_conexion_elastic
            LEFT JOIN
                usuarios u_insercion ON cet.usuario_insercion = u_insercion.id_usuario
            LEFT JOIN
                usuarios u_actualizacion ON cet.usuario_actualizacion = u_actualizacion.id_usuario
            WHERE
                cet.id_consulta_extraccion = ${id_consulta_extraccion}
            AND
                cet.estado = 'A'`,
            { type: consulta_extraccion.sequelize.QueryTypes.SELECT }
        );
        if (consultaExtraccion.length === 0) {
            return res.status(404).send({ message: 'No se encontró la consulta de extracción solicitada' });
        } else {
            return res.status(200).json(consultaExtraccion[0]);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear una nueva consulta de extraccion
exports.createConsultaExtraction = async (req, res) => {
    const { 
        id_conexion_db,
        consulta_data,
        transformacion_data,
        index_data,
        data_stream,
        use_columns_value,
        type,
        tracking_columns,
        id_conexion_elastic,
        usuario_insercion,
        fecha_insercion
    } = req.body;

    try {
        const consultaExtraccion = await consulta_extraccion.consulta_extraccion.create({
            id_conexion_db: id_conexion_db,
            consulta_data: consulta_data,
            transformacion_data: transformacion_data,
            index_data: index_data,
            data_stream: data_stream,
            use_columns_value: use_columns_value,
            type: type,
            tracking_columns: tracking_columns,
            id_conexion_elastic: id_conexion_elastic,
            usuario_insercion: usuario_insercion,
            fecha_insercion: fecha_insercion
        });
        if (consultaExtraccion) {
            return res.status(201).send({ message: 'Consulta de extracción creada correctamente' });
        } else {
            return res.status(400).send({ message: 'No se pudo crear la consulta de extracción' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar una consulta de extraccion
exports.updateConsultaExtraction = async (req, res) => {
    const { 
        id_consulta_extraccion,
        id_conexion_db,
        consulta_data,
        transformacion_data,
        index_data,
        data_stream,
        use_columns_value,
        type,
        tracking_columns,
        id_conexion_elastic,
        usuario_actualizacion,
        fecha_actualizacion
     } = req.body;

    try {
        const consultaExtraccion = await consulta_extraccion.consulta_extraccion.update({
            id_conexion_db: id_conexion_db,
            consulta_data: consulta_data,
            transformacion_data: transformacion_data,
            index_data: index_data,
            data_stream: data_stream,
            use_columns_value: use_columns_value,
            type: type,
            tracking_columns: tracking_columns,
            id_conexion_elastic: id_conexion_elastic,
            usuario_actualizacion: usuario_actualizacion,
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: {
                id_consulta_extraccion: id_consulta_extraccion
            }
        });
        if (consultaExtraccion == 0) {
            return res.status(404).send({ message: 'No se pudo actualizar la consulta de extracción' });
        } else {
            return res.status(200).send({ message: 'Consulta de extracción actualizada correctamente' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear o reemplazar el archivo de configuracion de Logstash para extraer datos
exports.generateLogstashConfig = async (req, res) => {
    const {
        path_logstash_config,
        name_logstash_config,
        conexion_driver_class,
        conexion_driver_library,
        conexion_password,
        conexion_string,
        conexion_user,
        consulta_data,
        transformacion_data,
        index_data,
        data_stream,
        use_columns_value,
        tracking_columns,
        type,
        hosts_elastic
    } = req.body;

    // Ruta del archivo de configuracion de Logstash
    const configFilePath = path.join(path_logstash_config, name_logstash_config);

    // Funcion para generar el archivo
    const generateLogstashConfig = () => `
        input {
            jdbc {
                clean_run => true
                jdbc_driver_library => "${conexion_driver_library}"
                jdbc_driver_class => "${conexion_driver_class}"
                jdbc_connection_string => "${conexion_string}"
                jdbc_user => "${conexion_user}"
                jdbc_password => "${conexion_password}"
                statement => "${consulta_data}"
                use_column_value => ${use_columns_value}
                tracking_column => "${tracking_columns}"
                type => "${type}"
            }
        }

        filter {
            ${transformacion_data}
        }

        output {
            elasticsearch {
                hosts => ["http://${hosts_elastic}"]
                index => "${index_data}"
                data_stream => ${data_stream}
            }
        }
    `;

    try {
        const configContent = generateLogstashConfig();
        await fs.writeFile(configFilePath, configContent);

        if (fs.existsSync(configFilePath)) {
            return res.status(200).send({ message: 'Archivo de configuración de Logstash generado correctamente', path: configFilePath });
        } else {
            return res.status(400).send({ message: 'No se pudo generar el archivo de configuración de Logstash' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};