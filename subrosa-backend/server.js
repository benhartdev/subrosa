require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const dynamicComponentsRouter = require('./src/routes/dynamicComponents');
const artistsRoutes = require('./src/routes/Artists');
const publicArtistsRoutes = require('./src/routes/PublicArtists'); // ✅ Nouveau fichier
const artworkRoutes = require('./src/routes/Artwork');
const session = require('express-session');
const uploadRoutes = require('./src/routes/uploadRoutes');



dotenv.config(); // Charge les variables d'environnement
console.log('🔧 Variable d\'environnement :', process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
connectDB();

// ✅ Middleware principal
app.use(cors({
  origin: 'http://localhost:3000',     // Autorise uniquement le frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
  allowedHeaders: ['Content-Type'],   // Headers autorisés
  credentials: true                   // ✅ Cookies autorisés
}));
app.use(session({
  secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // ⚠️ true en production HTTPS
      httpOnly: true,
      sameSite: 'lax',
    }
  }));
  
  

app.use(express.json());
console.log('📌 Middleware Express chargé.');
app.use('/uploads', express.static('uploads'));
app.use('/api/uploads', uploadRoutes);

// ✅ Routes
app.use('/api/public/artists', publicArtistsRoutes);  // Route publique
app.use('/api/artworks', artworkRoutes);
app.use('/api/dynamic', dynamicComponentsRouter);
app.use('/api/artists', artistsRoutes);              // Route protégée par ensureAdmin





// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
