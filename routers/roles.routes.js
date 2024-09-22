const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Ruta para buscar todas las empresas
router.get('/findAllRol', rolesController.findAllRol);

module.exports = router;