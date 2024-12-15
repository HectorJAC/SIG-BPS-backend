
module.exports = (sequelize, DataTypes) => {
    const usuarios_pedidos = sequelize.define('usuarios_pedidos', {
        id_usuario_pedido: {
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
        descripcion_pedido: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_pedido: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        id_usuario_asignado: {
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
        estado_pedido: {
            type: DataTypes.STRING(50),
            allowNull: false,
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
    return usuarios_pedidos;
};