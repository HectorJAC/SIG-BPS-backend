module.exports = (sequelize, DataTypes) => {
    const elk_ubicacion = sequelize.define('elk_ubicacion', {
        id_elk_ubicacion: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_elk: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        ubicacion_elk: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
    return elk_ubicacion;
};