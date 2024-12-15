const express = require('express');
const router = express.Router();
const conexionDbController = require('../controllers/conexionDbController');

// Ruta para obtener todas las conexiones de base de datos
router.get('/getAllConexionDb', conexionDbController.getAllConexionDb);

// Ruta para obtener los datos de una sola conexion segun su id
router.get('/getConexionDbById', conexionDbController.getConexionDbById);

// Ruta para crear una nueva conexion de base de datos
router.post('/createConexionDb', conexionDbController.createConexionDb);

// Ruta para actualizar los datos de una conexion de base de datos
router.put('/updateConexionDb', conexionDbController.updateConexionDb);

// Ruta para obtener las conexiones de base de datos sin paginacion
router.get('/getConexionDBData', conexionDbController.getConexionDBData);

module.exports = router;