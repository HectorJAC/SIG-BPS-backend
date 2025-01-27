module.exports = (sequelize, DataTypes) => {
    const dashboard_kibana = sequelize.define('dashboard_kibana', {
        id_dashboard_kibana: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_dashboard: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        dashboard_source: {
            type: DataTypes.STRING(255),
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
    return dashboard_kibana;
};