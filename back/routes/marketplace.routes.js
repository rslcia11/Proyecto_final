// routes/marketplace.routes.js
const express = require('express');
const router = express.Router();
const { createMarketItem } = require('../controllers/marketplace.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/upload'); // Nuestro middleware de multer

// La ruta ahora usa upload.single('photo') para procesar el archivo enviado con el campo "photo"
router.post('/', verifyToken, upload.single('photo'), createMarketItem);

module.exports = router;
