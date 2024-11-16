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
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'A'
        }
    },{
        timestamps: false,
        freezeTableName: true,
    });
    return dashboard_kibana;
};