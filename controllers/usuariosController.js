const usuarios = require('../models');

// Funcion para obtener los datos de un solo usuario
exports.getUser = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: { 
                id_usuario: id_usuario
            }
        });

        if (usuario !== null) {
            return res.status(200).send(usuario);
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
                r.tipo_rol as rol,
                e.nombre_empresa as nombre_empresa
            FROM
                usuarios u
            INNER JOIN
                roles r
            ON
                u.id_rol = r.id_rol
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            WHERE
                u.estado = 'A' AND
                u.id_rol = 2
            ORDER BY
                id_usuario
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
                r.tipo_rol as rol,
                e.nombre_empresa as nombre_empresa
            FROM
                usuarios u
            INNER JOIN
                roles r
            ON
                u.id_rol = r.id_rol
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            WHERE
                u.estado = 'A' AND
                u.id_empresa = ${id_empresa}
            ORDER BY
                id_usuario
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

// Funcion para crear un usuario con el rol de cliente
exports.createUserClient = async (req, res) => {
    const{ 
        username,
        password,
        nombres, 
        apellidos, 
        cedula,
        email, 
        numero_telefono, 
        id_empresa 
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
            const user = await usuarios.sequelize.models.usuarios.create({
                username: username,
                password: password,
                nombres: nombres,
                apellidos: apellidos,
                cedula: cedula,
                email: email,
                numero_telefono: numero_telefono,
                id_empresa: id_empresa,
                id_rol: 2,
                estado: 'A'
            });
            return res.status(201).send({ message: 'Usuario creado correctamente', user: user });
        } catch (error) {
            return res.status(500).send({ message: 'Error en el servidor', error: error });
        }
    }
};

// Funcion para obtener todos los usuarios con el rol de admin sin paginacion
exports.getAllAdmins = async (req, res) => {
    try {
        const admin = await usuarios.sequelize.models.usuarios.findOne({
            where: { 
                id_rol: 1
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

// Funcion para buscar un usuario por su username, cedula o por su nombre y apellido
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
                r.tipo_rol as rol,
                e.nombre_empresa as nombre_empresa
            FROM
                usuarios u
            INNER JOIN
                roles r
            ON
                u.id_rol = r.id_rol
            INNER JOIN
                empresas e
            ON
                u.id_empresa = e.id_empresa
            WHERE
                u.id_rol = 2 AND
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
