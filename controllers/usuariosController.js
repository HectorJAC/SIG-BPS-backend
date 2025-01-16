const usuarios = require('../models');
const bcrypt = require('bcrypt');

// Funcion para obtener los datos de un solo usuario
exports.getUser = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const usuario = await usuarios.sequelize.query(`
        SELECT
            u.*,
            e.nombre_empresa as nombre_empresa
        FROM
            usuarios u
        LEFT JOIN
            empresas e
        ON
            u.id_empresa = e.id_empresa
        WHERE
            u.id_usuario = ${id_usuario}`,
        { type: usuarios.sequelize.QueryTypes.SELECT }
        );

        if (usuario !== null) {
            return res.status(200).send(usuario[0]);
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de usuarios
        const totalUsers = await usuarios.sequelize.models.usuarios.count({
            where: {
                id_rol: 2,
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allUsers = await usuarios.sequelize.query(`
            SELECT
                u.*,
                e.nombre_empresa as nombre_empresa,
                count(ud.id_usuario) as cantidad_dashboards
            FROM
                usuarios u
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            LEFT JOIN
                usuarios_dashboard ud
            ON
                u.id_usuario = ud.id_usuario AND ud.estado = 'A'
            WHERE
                u.estado = 'A' AND
                u.id_rol = 2 
            GROUP BY
                u.id_usuario
            ORDER BY
                u.id_usuario DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: usuarios.sequelize.QueryTypes.SELECT }
        );
        if (allUsers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios registrados' });
        } else {
            return res.status(200).json({
                totalUsers: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                usuarios: allUsers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar un usuario mediante su id_empresa
exports.getUserByCompany = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página
    const { id_empresa } = req.body;
    try {
        // Consulta para obtener la cantidad total de usuarios
        const totalUsers = await usuarios.sequelize.models.usuarios.count({
            where: {
                estado: 'A',
                id_empresa: id_empresa
            }
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const users = await usuarios.sequelize.query(`
            SELECT
                u.*,
                e.nombre_empresa as nombre_empresa
            FROM
                usuarios u
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            WHERE
                u.estado = 'A' AND
                u.id_empresa = ${id_empresa}
            ORDER BY
                id_usuario DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: usuarios.sequelize.QueryTypes.SELECT }
        );

        if (users.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios registrados en esta empresa' });
        } else {
            return res.status(200).json({
                totalUsers: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                usuarios: users,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para crear un usuario con el rol de gerente
exports.createUserClient = async (req, res) => {
    const{ 
        username,
        password,
        nombres, 
        apellidos, 
        cedula,
        email, 
        numero_telefono, 
        id_empresa,
        fecha_insercion,
    } = req.body;
    if (
        !username || 
        !password || 
        !nombres || 
        !apellidos || 
        !cedula || 
        !email ||  
        !id_empresa
    ) {
        return res.status(400).send({ message: 'Debe llenar los campos obligatorios' });
    } else {
        try {
            const passwordHash = await bcrypt.hash(password, 10);

            const user = await usuarios.sequelize.models.usuarios.create({
                username: username,
                password: passwordHash,
                nombres: nombres,
                apellidos: apellidos,
                cedula: cedula,
                email: email,
                numero_telefono: numero_telefono,
                id_empresa: id_empresa,
                id_rol: 2,
                fecha_insercion: fecha_insercion,
                estado: 'A'
            });
            return res.status(201).send({ message: 'Usuario creado correctamente', user: user });
        } catch (error) {
            return res.status(500).send({ 
                message: error.name === 'SequelizeUniqueConstraintError' ? 'El nombre de usuario o cedula ya existe' : 'Error en el servidor',
                error: error 
            });
        }
    }
};

// Funcion para crear un usuario con el rol de administrador
exports.createUserAdmin = async (req, res) => {
    const{ 
        username,
        password,
        nombres, 
        apellidos, 
        cedula,
        email, 
        numero_telefono, 
        fecha_insercion,
    } = req.body;
    if (
        !username || 
        !password || 
        !nombres || 
        !apellidos || 
        !cedula || 
        !email
    ) {
        return res.status(400).send({ message: 'Debe llenar los campos obligatorios' });
    } else {
        try {
            const passwordHash = await bcrypt.hash(password, 10);

            const user = await usuarios.sequelize.models.usuarios.create({
                username: username,
                password: passwordHash,
                nombres: nombres,
                apellidos: apellidos,
                cedula: cedula,
                email: email,
                numero_telefono: numero_telefono,
                id_rol: 1,
                fecha_insercion: fecha_insercion,
                estado: 'A'
            });
            return res.status(201).send({ message: 'Usuario creado correctamente', user: user });
        } catch (error) {
            // return res.status(500).send({ message: 'Error en el servidor', error: error });
            return res.status(500).send({ 
                message: error.name === 'SequelizeUniqueConstraintError' ? 'El nombre de usuario o cedula ya existe' : 'Error en el servidor',
                error: error 
            });
        }
    }
};

// Funcion para obtener todos los usuarios con el rol de admin sin paginacion
exports.getAllAdmins = async (req, res) => {
    const { estado } = req.query;
    try {
        const admin = await usuarios.sequelize.models.usuarios.findAll({
            where: { 
                id_rol: 1,
                estado: estado
            }
        });

        if (admin !== null) {
            return res.status(200).send(admin);
        } else {
            return res.status(404).send({ message: 'No se encontraron administradores' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para buscar un usuario por su username, cedula o por su nombre y apellido o por el nombre de su empresa
exports.searchUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { search, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de usuarios
        const totalUsers = await usuarios.sequelize.models.usuarios.count({
            where: {
                estado: estado
            }
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allUsers = await usuarios.sequelize.query(`
            SELECT
                u.*,
                e.nombre_empresa as nombre_empresa
            FROM
                usuarios u
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            WHERE
                (u.id_usuario LIKE '%${search}%' OR
                u.cedula LIKE '%${search}%' OR
                u.username LIKE '%${search}%' OR
                CONCAT(u.nombres, ' ', u.apellidos) LIKE '%${search}%' OR
                e.nombre_empresa LIKE '%${search}%') AND
                u.id_rol = 2 AND
                u.estado = '${estado}'
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: usuarios.sequelize.QueryTypes.SELECT } 
        );
        if (allUsers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios' });
        } else {
            return res.status(200).json({
                totalUsers: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                usuarios: allUsers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los administradores con paginacion
exports.getAllAdminsPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de usuarios
        const totalUsers = await usuarios.sequelize.models.usuarios.count({
            where: {
                id_rol: 1,
                estado: 'A'
            }
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allUsers = await usuarios.sequelize.query(`
            SELECT
                u.*
            FROM
                usuarios u
            WHERE
                u.estado = 'A' AND
                u.id_rol = 1
            ORDER BY
                id_usuario DESC
            LIMIT
                ${limit} OFFSET ${offset}`,
            { type: usuarios.sequelize.QueryTypes.SELECT }
        );
        if (allUsers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios registrados' });
        } else {
            return res.status(200).json({
                totalUsers: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                usuarios: allUsers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar un administrador por su username, cedula o por su nombre y apellido
exports.searchAdmin = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página

    const { search, estado } = req.query;
    try {
        // Consulta para obtener la cantidad total de usuarios
        const totalUsers = await usuarios.sequelize.models.usuarios.count({
            where: {
                estado: estado
            }
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const allUsers = await usuarios.sequelize.query(`
            SELECT
                u.*
            FROM
                usuarios u
            WHERE
                u.id_rol = 1 AND
                u.estado = '${estado}' AND
                (u.id_usuario LIKE '%${search}%' OR
                u.cedula LIKE '%${search}%' OR
                u.username LIKE '%${search}%' OR
                CONCAT(u.nombres, ' ', u.apellidos) LIKE '%${search}%')
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: usuarios.sequelize.QueryTypes.SELECT } 
        );
        if (allUsers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios' });
        } else {
            return res.status(200).json({
                totalUsers: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                usuarios: allUsers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar un usuario
exports.updateUser = async (req, res) => {
    const {
        id_usuario,
        nombres,
        apellidos,
        cedula,
        email,
        numero_telefono,
        fecha_actualizacion,
    } = req.body;
    if (
        !nombres || 
        !apellidos || 
        !cedula || 
        !email 
    ) {
        return res.status(400).send({ message: 'Debe llenar los campos obligatorios' });
    } else {
        try {
            const user = await usuarios.sequelize.models.usuarios.update({
                nombres: nombres,
                apellidos: apellidos,
                cedula: cedula,
                email: email,
                numero_telefono: numero_telefono,
                fecha_actualizacion: fecha_actualizacion
            }, {
                where: { id_usuario: id_usuario }
            });

            if (user.length > 0) {
                return res.status(200).send({ message: 'Usuario actualizado correctamente', user: user });
            } else {
                return res.status(404).send({ message: 'No se pudo actualizar el usuario' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Error en el servidor', error: error });
        }
    }
};

// Funcion para cambiar la contraseña de un usuario
exports.changePassword = async (req, res) => {
    const { id_usuario, new_password } = req.body;

    if (!new_password) {
        console.log(new_password);
        return res.status(400).send({ message: 'Debe llenar los campos obligatorios' });
    } else {
        try {
            // Generar un hash para la nueva contraseña
            const hashedPassword = await bcrypt.hash(new_password, 10);

            // Actualizar la contraseña en la base de datos
            const user = await usuarios.sequelize.models.usuarios.update(
                { password: hashedPassword },
                { where: { id_usuario: id_usuario } }
            );

            if (user[0] > 0) {
                return res.status(200).send({ message: 'Contraseña actualizada correctamente' });
            } else {
                return res.status(404).send({ message: 'No se pudo actualizar la contraseña' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Error en el servidor', error: error });
        }
    }
};

// Funcion para inactivar un usuario
exports.deleteUser = async (req, res) => {
    const { id_usuario, fecha_actualizacion } = req.body;
    try {
        const user = await usuarios.sequelize.models.usuarios.update({
            estado: 'I',
            fecha_actualizacion: fecha_actualizacion
        }, {
            where: { id_usuario: id_usuario }
        });

        if (user.length > 0) {
            return res.status(200).send({ message: 'Usuario eliminado correctamente', user: user });
        } else {
            return res.status(404).send({ message: 'No se pudo eliminar el usuario' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
