// middlewares/upload.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Puedes cambiar la ruta según tu estructura
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Renombramos el archivo para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
