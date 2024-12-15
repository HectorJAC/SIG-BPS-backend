
module.exports = (sequelize, DataTypes) => {
    const empresas = sequelize.define('empresas', {
        id_empresa: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rnc_empresa: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        nombre_empresa: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        telefono_empresa: {
            type: DataTypes.BIGINT(19),
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
    return empresas;
};