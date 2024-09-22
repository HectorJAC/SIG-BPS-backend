
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
            type: DataTypes.DATE,
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
        estado_pedido: {
            type: DataTypes.STRING(50),
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
    return usuarios_pedidos;
};