const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');

// Ruta para buscar todas las empresas
router.get('/findAllCompany', empresasController.findAllCompany);

// Ruta para buscar todas las empresas sin paginacion
router.get('/findAllCompanyWithoutPagination', empresasController.findAllCompanyWithoutPagination);

// Ruta para obtnener los datos de una sola empresa segun su id
router.get('/getCompanyById', empresasController.getCompanyById);

// Ruta para crear una nueva empresa
router.post('/createCompany', empresasController.createCompany);

// Ruta para actualizar los datos de una empresa
router.put('/updateCompany', empresasController.updateCompany);

// Ruta para cambiar el estado de una empresa
router.put('/changeStateCompany', empresasController.changeStateCompany);

// Ruta para buscar empresas por id y nombre
router.get('/searchCompany', empresasController.searchCompany);

module.exports = router;