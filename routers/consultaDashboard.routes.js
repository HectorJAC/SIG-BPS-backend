const express = require('express');
const router = express.Router();
const consultaDashboadController = require('../controllers/consultaDashboardController');

// Ruta para obtener todos los consultas dashboard de un dashboard
router.get('/getAllConsultDashboardByDashboard', consultaDashboadController.getAllConsultDashboardByDashboard);

// Ruta para inactivar una consulta dashboard
router.put('/deleteConsultDashboard', consultaDashboadController.deleteConsultDashboard);

// Ruta para crear una consulta dashboard
router.post('/addConsultDashboard', consultaDashboadController.addConsultDashboard);

// Ruta para buscar una consulta perteneciente a un dashboard
router.get('/searchConsultaExtraccionDashboard', consultaDashboadController.searchConsultaExtraccionDashboard);

module.exports = router;