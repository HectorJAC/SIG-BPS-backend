const express = require('express');
const router = express.Router();
const ubicacionElkController = require('../controllers/ubicacionElkController');

// Ruta para obtener todas las ubicaciones ELK
router.get('/findAllElkUbication', ubicacionElkController.findAllElkUbication);

// Ruta para buscar una ubicacion ELK 
router.get('/searchElkUbication', ubicacionElkController.searchElkUbication);

// Ruta para obtener los datos de una sola ubicacion ELK segun su id
router.get('/getElkById', ubicacionElkController.getElkById);

// Ruta para actualizar los datos de una ubicacion ELK
router.put('/updateElk', ubicacionElkController.updateElk);

module.exports = router;