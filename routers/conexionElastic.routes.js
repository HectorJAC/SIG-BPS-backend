const express = require('express');
const router = express.Router();
const conexionElasticController = require('../controllers/conexionElasticController');

// Ruta para obtener todas las conexiones de elastic
router.get('/getAllElasticConnections', conexionElasticController.getAllElasticConnections);

// Ruta para crear una nueva conexion de elastic
router.post('/createElasticConnection', conexionElasticController.createElasticConnection);

// Ruta para inactivar una conexion de elastic
router.put('/deleteElasticConnection', conexionElasticController.deleteElasticConnection);

// Ruta para obtener los datos de una sola conexion de elastic segun su id
router.get('/getElasticConnectionById', conexionElasticController.getElasticConnectionById);

// Ruta para actualizar una conexion de elastic
router.put('/updateElasticConnection', conexionElasticController.updateElasticConnection);

module.exports = router;