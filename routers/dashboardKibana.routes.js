const express = require('express');
const router = express.Router();
const dashboardKibanaController = require('../controllers/dashboardKibanaController');

// Ruta para obtener todos los dashboards que pertenecen a un usuario
router.get('/getDashboardKibanaByUser', dashboardKibanaController.getDashboardKibanaByUser);

// Ruta para obtener todos los dashboards
router.get('/getAllDashboards', dashboardKibanaController.getAllDashboards);

// Ruta para buscar dashboards
router.get('/searchDashboard', dashboardKibanaController.searchDashboard);

module.exports = router;