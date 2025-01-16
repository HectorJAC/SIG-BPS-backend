const express = require('express');
const router = express.Router();
const consultaExtraccionController = require('../controllers/consultaExtraccionController');

// Ruta para obtener todas las consultas de extraccion
router.get('/getAllConsultaExtraccion', consultaExtraccionController.getAllConsultaExtraccion);

// Ruta para obtener una consulta de extraccion por ID
router.get('/getConsultaExtraccionById', consultaExtraccionController.getConsultaExtraccionById);

// Ruta para crear una consulta de extraccion
router.post('/createConsultaExtraction', consultaExtraccionController.createConsultaExtraction);

// Ruta para actualizar una consulta de extraccion
router.put('/updateConsultaExtraction', consultaExtraccionController.updateConsultaExtraction);

// Ruta para buscar una consulta extraccion
router.get('/searchConsultaExtraccion', consultaExtraccionController.searchConsultaExtraccion);

// Ruta para generar el archivo de configuracion de Logstash
router.post('/generateLogstashConfig', consultaExtraccionController.generateLogstashConfig);

module.exports = router;