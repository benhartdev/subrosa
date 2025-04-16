// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion à MongoDB réussie depuis connectDB()');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB depuis connectDB() :', error.message);
    process.exit(1); // Arrête le serveur si la BDD est inaccessible
  }
};

module.exports = connectDB;
