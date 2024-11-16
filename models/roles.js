
module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define('roles', {
        id_rol: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipo_rol: {
            type: DataTypes.STRING(20),
            allowNull: false,
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
    return roles;
};