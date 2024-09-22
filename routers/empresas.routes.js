const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');

// Ruta para buscar todas las empresas
router.get('/findAllCompany', empresasController.findAllCompany);

// Ruta para buscar todas las empresas sin paginacion
router.get('/findAllCompanyWithoutPagination', empresasController.findAllCompanyWithoutPagination);

module.exports = router;