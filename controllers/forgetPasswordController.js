const usuarios = require('../models');
const bcrypt = require('bcrypt'); // Importa bcrypt

// Función para cambiar la contraseña
exports.forgetPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Buscar el usuario por su username
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: { username: username },
        });

        if (usuario) {
            if (usuario.estado === 'I') {
                return res.status(200).send({ 
                    message: 'No puede cambiar la contraseña de un usuario eliminado', 
                    usuario: usuario 
                });
            }

            if (usuario.estado === 'A') {
                // Generar un hash para la nueva contraseña
                const hashedPassword = await bcrypt.hash(password, 10);

                // Actualizar la contraseña en la base de datos
                await usuarios.sequelize.models.usuarios.update(
                    { password: hashedPassword },
                    { where: { username: username } }
                );

                return res.status(200).send({ 
                    message: 'Contraseña actualizada correctamente',
                    usuario: usuario
                });
            }
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
