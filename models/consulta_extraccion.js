module.exports = (sequelize, DataTypes) => {
    const consulta_extraccion = sequelize.define('consulta_extraccion', {
        id_consulta_extraccion: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_conexion_db: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'conexion_db',
                key: 'id_conexion_db'
            }
        },
        consulta_data: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            comment: 'Consulta SQL'
        },
        transformacion_data: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        index_data: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Nombre id extraccion'
        },
        data_stream: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        use_columns_value: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        tracking_columns: {
            type: DataTypes.STRING(120),
            allowNull: false,
            comment: 'Primary key de la tabla'
        },
        type: {
            type: DataTypes.STRING(120),
            allowNull: false,
            comment: 'Nombre de la tabla'
        },
        id_conexion_elastic: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'conexion_elastic',
                key: 'id_conexion_elastic'
            }
        },
        usuario_insercion: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        fecha_insercion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        usuario_actualizacion: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        fecha_actualizacion: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'A',
            comment: 'Estado defecto A'
        }
    },{
        timestamps: false,
        freezeTableName: true,
    });
    return consulta_extraccion;
};