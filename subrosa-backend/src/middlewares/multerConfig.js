// middleware/multerConfig.js 

const multer = require('multer'); 
const path = require('path');

// Configuration du stockage 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
    cb(null, 'uploads/'); 
  }, 
  filename: (req, file, cb) => { 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
  } 
});

// Filtrage des fichiers (images uniquement : jpeg, jpg, png, svg)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
  const allowedExt = ['.jpeg', '.jpg', '.png', '.svg'];

  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers jpeg, jpg, png et svg sont autorisés.'));
  }
};

// Limites de fichier 
const upload = multer({ 
  storage, 
  limits: { fileSize: 25 * 1024 * 1024 }, 
  fileFilter 
});

module.exports = upload;
