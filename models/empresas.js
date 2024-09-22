
module.exports = (sequelize, DataTypes) => {
    const empresas = sequelize.define('empresas', {
        id_empresa: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_empresa: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'A'
        }
    },{
        timestamps: false
    });
    return empresas;
};