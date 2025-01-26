const usuarios = require('../models');
const empresas = require('../models');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Función para el inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario por su username
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: { username: username },
        });

        if (usuario) {
            // Verificar la contraseña ingresada con el hash almacenado
            const isPasswordValid = await bcrypt.compare(password, usuario.password);

            if (isPasswordValid) {
                if (usuario.estado === 'I') {
                    return res.status(200).send({ 
                        message: 'Usuario eliminado. Registre uno nuevo o contacte con el administrador', 
                        usuario: usuario 
                    });
                }

                const accessToken = sign(
                    { username: usuario.username, id: usuario.id_usuario },
                    'secretkey'
                );

                if (usuario.id_rol === 2 && usuario.estado === 'A') {
                    const empresa = await empresas.sequelize.models.empresas.findOne({
                        where: { id_empresa: usuario.id_empresa },
                    });

                    return res.status(200).send({ 
                        message: 'Inicio de sesión exitoso',
                        accessToken: accessToken,
                        usuario: usuario,
                        empresa: empresa,
                    });
                } else if (usuario.id_rol === 1 && usuario.estado === 'A') {
                    return res.status(200).send({ 
                        message: 'Inicio de sesión exitoso',
                        accessToken: accessToken,
                        usuario: usuario,
                    });
                }
            } else {
                // Contraseña incorrecta
                return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            // Usuario no encontrado
            return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
