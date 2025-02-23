// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ message: 'La ruta de upload está funcionando' });
});

console.log('Configurando ruta de upload...'); // Debug log

// Crear el directorio de uploads si no existe
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Directorio de uploads creado:', uploadDir); // Debug log
}

// Configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Guardando archivo en:', uploadDir); // Debug log
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    console.log('Nombre del archivo:', filename); // Debug log
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    console.log('Tipo de archivo:', file.mimetype); // Debug log
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'), false);
    }
    cb(null, true);
  }
});

// Ruta para subir archivos
router.post('/', upload.single('file'), (req, res) => {
  console.log('Recibida solicitud POST en /upload'); // Debug log
  console.log('Headers:', req.headers); // Debug log
  console.log('Files:', req.file); // Debug log
  
  try {
    if (!req.file) {
      console.log('No se encontró archivo en la solicitud'); // Debug log
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Construir la URL del archivo
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log('URL del archivo:', fileUrl); // Debug log

    res.json({ 
      url: fileUrl,
      message: 'Archivo subido correctamente' 
    });
  } catch (error) {
    console.error('Error detallado:', error); // Debug log
    res.status(500).json({ 
      error: 'Error al procesar la subida del archivo',
      details: error.message 
    });
  }
});

console.log('Rutas configuradas:', router.stack.map(r => r.route?.path).filter(Boolean)); // Debug log

module.exports = router;