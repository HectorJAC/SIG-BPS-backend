const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Ruta para crear un nuevo pedido
router.post('/createPedido', pedidosController.createPedido);

// Ruta para obtener todos los pedidos
router.get('/getAllPedidos', pedidosController.getAllPedidos);

// Ruta para obtener la cantidad de pedidos por estado
router.get('/getPedidosCountByStatus', pedidosController.getPedidosCountByStatus);

// Ruta para obtener los pedidos dependiendo su estado
router.get('/getPedidosByStatus', pedidosController.getPedidosByStatus);

// Ruta para actualizar el estado de un pedido
router.put('/updatePedidoStatus', pedidosController.updatePedidoStatus);

// Ruta para obtener los pedidos de un usuario
router.get('/getAllPedidosByUser', pedidosController.getAllPedidosByUser);

// Ruta para inactivar un pedido
router.put('/deletePedido', pedidosController.deletePedido);

// Ruta para actualizar el usuario asignado a un pedido
router.put('/updatePedidoUser', pedidosController.updatePedidoUser);

module.exports = router;