const express = require('express');
const router = express.Router();
const dashboardKibanaController = require('../controllers/dashboardKibanaController');

router.get('/getDashboardKibanaByUser', dashboardKibanaController.getDashboardKibanaByUser);

module.exports = router;