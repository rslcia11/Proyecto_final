
const express = require('express');
const router = express.Router();
const Neighborhood = require('../models/neighborhood'); // Asume que tienes un modelo Neighborhood

router.get('/', async (req, res) => {
  try {
      // Agregar log para debugging
      console.log('Intentando obtener barrios...');
      
      const neighborhoods = await Neighborhood.findAll();
      console.log('Barrios obtenidos:', neighborhoods);
      
      res.status(200).json(neighborhoods);
  } catch (error) {
      // Log más detallado del error
      console.error('Error completo:', error);
      res.status(500).json({ 
          message: 'Error al obtener barrios', 
          error: error.message,
          // Agregar más detalles del error
          stack: error.stack 
      });
  }
});

module.exports = router;
