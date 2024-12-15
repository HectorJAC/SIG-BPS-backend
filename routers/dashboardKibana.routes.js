const express = require('express');
const router = express.Router();
const dashboardKibanaController = require('../controllers/dashboardKibanaController');

// Ruta para obtener todos los dashboards que pertenecen a un usuario
router.get('/getDashboardKibanaByUser', dashboardKibanaController.getDashboardKibanaByUser);

// Ruta para obtener todos los dashboards
router.get('/getAllDashboards', dashboardKibanaController.getAllDashboards);

// Ruta para buscar dashboards
router.get('/searchDashboard', dashboardKibanaController.searchDashboard);

// Ruta para obtener los datos de un dashboard
router.get('/getDashboard', dashboardKibanaController.getDashboard);

// Ruta para crear un dashboard
router.post('/createDashboard', dashboardKibanaController.createDashboard);

// Ruta para actualizar un dashboard
router.put('/updateDashboard', dashboardKibanaController.updateDashboard);

// Ruta para obtener los dashboards de un usuario de forma paginada
router.get('/getUserDashboardPaginated', dashboardKibanaController.getUserDashboardPaginated);

// Ruta para inactivar un usuario_dashboard
router.put('/inactivateUserDashboard', dashboardKibanaController.inactivateUserDashboard);

// Ruta para agregar un dashboard a un usuario
router.post('/addUserDashboard', dashboardKibanaController.addUserDashboard);

module.exports = router;