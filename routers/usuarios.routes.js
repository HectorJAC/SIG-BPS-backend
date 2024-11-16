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

module.exports = router;