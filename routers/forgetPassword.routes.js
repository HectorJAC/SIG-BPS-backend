const express = require('express');
const router = express.Router();
const forgetPasswordController = require('../controllers/forgetPasswordController');

router.put('/', forgetPasswordController.forgetPassword);

module.exports = router;