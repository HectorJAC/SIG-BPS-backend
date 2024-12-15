module.exports = (sequelize, DataTypes) => {
    const conexion_elastic = sequelize.define('conexion_elastic', {
        id_conexion_elastic: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        hosts_elastic: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'IP DE ElasticSearch'
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
    return conexion_elastic;
};