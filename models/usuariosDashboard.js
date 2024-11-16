module.exports = (sequelize, DataTypes) => {
    const usuarios_dashboard = sequelize.define('usuarios_dashboard', {
        id_usuario_dashboard: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
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
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'A'
        }
    },{
        timestamps: false,
        freezeTableName: true,
    });
    return usuarios_dashboard;
};