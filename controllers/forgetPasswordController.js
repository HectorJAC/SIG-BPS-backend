const usuarios = require('../models');

// Función para cambiar la contraseña
exports.forgetPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: {
                username: username
            }
        });
        if (usuario !== null) {
            await usuarios.sequelize.models.usuarios.update({
                password: password
            }, {
                where: {
                    username: username
                }
            });

            return res.status(200).send({ message: 'Contraseña actualizada correctamente' });
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};