const express = require('express');
const router = express.Router();
const MarketplaceController = require('../controllers/marketplace.controller');
const multer = require("multer");
const upload = multer();

// Ruta para obtener todos los productos
router.get('/', MarketplaceController.getProducts);

// Ruta para obtener un producto específico por ID
router.get('/:id', MarketplaceController.getProductById);

// Ruta para crear un nuevo producto
router.post('/', MarketplaceController.createProduct);
router.post("/marketplace", upload.none(), MarketplaceController.createProduct);  // ✅ Corregido

// Ruta para actualizar un producto existente
router.put('/:id', MarketplaceController.updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', MarketplaceController.deleteProduct);

module.exports = router;
