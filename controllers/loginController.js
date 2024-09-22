const usuarios = require('../models');
const empresas = require('../models');
const { sign } = require('jsonwebtoken');

// Función para el inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: {
                username: username,
                password: password
            }
        });

        if (usuario !== null) {
            const accessToken = sign({
                username: usuario.username,
                id: usuario.id_usuario
            }, 'secretkey');

            if (usuario.id_rol === 2) {
                const empresa = await empresas.sequelize.models.empresas.findOne({
                    where: {
                        id_empresa: usuario.id_empresa
                    }
                });
    
                return res.status(200).send({ 
                    message: 'Inicio de sesión exitoso',
                    accessToken: accessToken,
                    usuario: usuario,
                    empresa: empresa
                });
            } else {
                return res.status(200).send({ 
                    message: 'Inicio de sesión exitoso',
                    accessToken: accessToken,
                    usuario: usuario
                });
            }
        } else {
            return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};