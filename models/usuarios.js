module.exports = (sequelize, DataTypes) => {
    const usuarios = sequelize.define('usuarios', {
        id_usuario: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        id_rol: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id_rol'
            }
        },
        nombres: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        cedula: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        email: {
            type: DataTypes.BIGINT(120),
            allowNull: false,
        },
        numero_telefono: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
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
        },
    },{
        tableName: 'usuarios',
        timestamps: false
    });
    return usuarios;
};


