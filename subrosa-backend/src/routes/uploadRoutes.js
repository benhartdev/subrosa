// routes/uploadRoutes.js 

const express = require('express'); 
const router = express.Router(); 
const upload = require('../middlewares/multerConfig'); 

// config Multer 
const uploadController = require('../controllers/uploadController');

// Route : Upload d'une image avec alt/caption 
 
router.post( '/upload/:artistId', upload.single('image'), uploadController.uploadSingleImage );

// Route : Upload de plusieurs images avec alt[] et caption[] 
router.post( '/upload-multiple/:artistId', upload.array('images', 5), uploadController.uploadMultipleImages );

module.exports = router;