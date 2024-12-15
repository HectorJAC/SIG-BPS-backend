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
            comment: '1 = admin, 2 = gerente'
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
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(19),
            allowNull: false,
        },
        numero_telefono: {
            type: DataTypes.BIGINT(19),
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
        fecha_insercion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        },
    },{
        tableName: 'usuarios',
        timestamps: false,
        freezeTableName: true,
    });
    return usuarios;
};


