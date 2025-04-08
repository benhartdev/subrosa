

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
const path = require('path');
const adminArtistsRoutes = require('./src/routes/AdminArtists'); // ✅ Nouveau fichier
const adminRoutes = require('./src/routes/adminRoutes'); // ✅ Nouveau fichier
const authRoutes = require('./src/routes/authRoutes'); // ✅ Nouveau fichier
const userRoutes = require('./src/routes/userRoutes');
const cookieParser = require('cookie-parser');


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
app.use(cookieParser());
console.log('📌 Middleware Express chargé.');
// Accès public aux fichiers uploadés
app.set('trust proxy', 1); // si proxy utilisé


// ✅ Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((error) => console.error('❌ Erreur de connexion à MongoDB :', error));


// ✅ ROUTES 

  // 🟣 PUBLIC ROUTES 
   
  app.use('/api/public/artists', publicArtistsRoutes); // artistes visibles par tous

  // 🟢 AUTHENTICATION 
  
   app.use('/api/auth', authRoutes); // connexion / logout
   app.use('/api/users', userRoutes); // inscription utilisateur

  // 🟡 UPLOADS 
   
   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
   app.use('/api/uploads', uploadRoutes); // upload d'images (admin/artistes)

  // 🔴 ADMIN ROUTES 
   
   app.use('/api/admin', adminArtistsRoutes); // gestion artistes côté admin 
   app.use('/api', adminRoutes); // dashboard admin (stats, etc.)

  // 🔵 PRIVATE PROTECTED ROUTES (nécessite rôle) 
   app.use('/api/artworks', artworkRoutes); // gestion des œuvres 
   app.use('/api/artists', artistsRoutes); // gestion des artistes (artiste connecté)

  // 🟤 DYNAMIC COMPONENTS 
   app.use('/api/dynamic', dynamicComponentsRouter);




// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
