// controllers/marketplace.controller.js
const Marketplace = require('../models/marketplace.model');
const ContentType = require('../models/content_type.model');

const createMarketItem = async (req, res) => {
  try {
    // Los datos del formulario se encuentran en req.body
    const { description, idbusiness, price, status } = req.body;

    // Verifica que se hayan enviado los campos obligatorios
    if (!description || !idbusiness || !price || !status) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Crea la publicación en la tabla marketplace
    const newMarketItem = await Marketplace.create({
      description,
      idbusiness: Number(idbusiness),
      price: Number(price),
      status
    });

    // Procesar el archivo subido (la foto)
    // Multer guarda la información del archivo en req.file
    if (req.file) {
      // Inserta un registro en la tabla content_type para relacionar la imagen con la publicación
      await ContentType.create({
        type: 'image', // O 'photo'
        filePath: req.file.path, // La ruta donde se guardó el archivo
        iduser: req.user.id, // Suponiendo que verifyToken añade la información del usuario a req.user
        idmarketplace: newMarketItem.idmarketplace
      });
    } else {
      // Opcional: si el archivo es obligatorio, podrías devolver un error aquí
      return res.status(400).json({ error: 'Debes subir una imagen del producto.' });
    }

    res.status(201).json(newMarketItem);
  } catch (error) {
    console.error("Error creando producto en marketplace:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMarketItem };
