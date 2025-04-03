// middleware/multerConfig.js 

const multer = require('multer'); 
const path = require('path');

// Configuration du stockage 
const storage = multer.diskStorage({ destination: (req, file, cb) => { cb(null, 'uploads/'); }, filename: (req, file, cb) => { const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); } });

// Filtrage des fichiers (images uniquement) 
    const fileFilter = (req, file, cb) => { const allowedTypes = /jpeg|jpg|png|gif/; 
    const mimetype = allowedTypes.test(file.mimetype); 
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

if (mimetype && extname) 
    
    { return cb(null, true); 

    } else { cb(new Error('Seules les images sont autorisées !')); } };

// Limites de fichier 
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

module.exports = upload;