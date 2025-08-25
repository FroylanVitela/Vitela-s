// server/routes/products.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const validateObjectId = require('../middleware/validateObjectId');

// Lista con paginación/filtrado definidos en tu controlador
router.get('/', controller.list);

// Detalle por id (valida ObjectId)
router.get('/:id', validateObjectId('id'), controller.get);

// Crear / Actualizar / Eliminar
router.post('/', controller.create);
router.put('/:id', validateObjectId('id'), controller.update);
router.delete('/:id', validateObjectId('id'), controller.remove);

module.exports = router;