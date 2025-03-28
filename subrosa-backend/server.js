
console.log('📌 Initialisation de dotenv...');
require('dotenv').config(); // Charge les variables d'environnement
console.log('📌 Variables d\'environnement chargées.');

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const dynamicComponentsRouter = require('./src/routes/dynamicComponents');
const artistsRoutes = require('./src/routes/Artists');
const publicArtistsRoutes = require('./src/routes/PublicArtists');  // Nouveau fichier
const artworkRoutes = require('./src/routes/Artwork');

dotenv.config();   // Charge les variables d'environnement


console.log('variable d\'environnement :', process.env.MONGO_URI);


const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use('/api/dynamic', dynamicComponentsRouter);

// Connexion à MongoDB
console.log('📌 Tentative de connexion à MongoDB avec l\'URL :', process.env.MONGO_URI);
console.log('📌 Chargement de la configuration depuis .env:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connexion à MongoDB réussie !'))
    .catch((error) => console.error('❌ Erreur de connexion à MongoDB :', error));
    
// Middleware
app.use(cors());
app.use(express.json());

console.log('📌 Middleware Express chargé.');

// Routes API 

// Routes publiques
app.use('/api/public/artists', publicArtistsRoutes);  // Route publique pour récupérer les artistes
app.use('/api/artworks', artworkRoutes);

// Routes protégées (admin seulement)
app.use('/api/artists', artistsRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
