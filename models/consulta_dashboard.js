module.exports = (sequelize, DataTypes) => {
    const consulta_dashboard = sequelize.define('consulta_dashboard', {
        id_consulta_dashboard: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_consulta_extraccion: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'consulta_extraccion',
                key: 'id_consulta_extraccion'
            }
        },
        id_dashboard_kibana: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'dashboard_kibana',
                key: 'id_dashboard_kibana'
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
    return consulta_dashboard;
};