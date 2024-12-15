module.exports = (sequelize, DataTypes) => {
    const conexion_db = sequelize.define('conexion_db', {
        id_conexion_db: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_empresa: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'empresas',
                key: 'id_empresa'
            }
        },
        nombre_conexion_db: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        conexion_driver_library: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        conexion_driver_class: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        conexion_string: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        conexion_user: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        conexion_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
    return conexion_db;
};