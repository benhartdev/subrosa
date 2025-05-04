// src/middlewares/errorHandler.js
const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: '❌ Image trop volumineuse. Limite : 12 Mo.' });
  }

  console.error('❌ Erreur serveur :', err);
  res.status(500).json({ message: 'Erreur serveur.', details: err.message });
};

module.exports = errorHandler;
