// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');


// Charge les variables d'environnement
dotenv.config();

// Connexion à la BDD
const connectDB = require('./config/database');
connectDB();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Frontend uniquement
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // passer à true en production avec HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Montage des routes




app.use('/api/artists', require('./src/routes/artistsRoutes'));              // routes artistes
app.use('/api/artworks', require('./src/routes/artworkRoutes'));             // routes œuvres
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));                  // routes réservées aux admins
app.use('/api/auth', require('./src/routes/authRoutes'));                    // authentification
app.use('/api/uploads', require('./src/routes/uploadRoutes'));               // gestion des uploads

// Pour rendre les fichiers statiques accessibles (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});


