const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para obtener los datos de un usuario
router.get('/getUser', usuariosController.getUser);

// Ruta para obtener todos los usuarios
router.get('/getAllUsers', usuariosController.getAllUsers);

// Ruta para obtener un usuario mediante su id_empresa
router.get('/getUserByCompany', usuariosController.getUserByCompany);

// Ruta para crear un usuario que es cliente
router.post('/createUserClient', usuariosController.createUserClient);

// Ruta para obtener todos los usuarios con el rol de admin
router.get('/getAllAdmins', usuariosController.getAllAdmins);

// Ruta para buscar usuarios
router.get('/searchUser', usuariosController.searchUser);

// Ruta para obtener todos los usuarios con el rol de admin paginados
router.get('/getAllAdminsPagination', usuariosController.getAllAdminsPagination);

// Ruta para buscar administradores
router.get('/searchAdmin', usuariosController.searchAdmin);

// Ruta para actualizar un usuario
router.put('/updateUser', usuariosController.updateUser);

// Ruta para cambiar la contraseña de un usuario
router.put('/changePassword', usuariosController.changePassword);

// Ruta para crear un usuario administrador
router.post('/createUserAdmin', usuariosController.createUserAdmin);

// Ruta para eliminar un usuario
router.put('/deleteUser', usuariosController.deleteUser);

module.exports = router;