// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
const sessionRoutes = require('./src/routes/sessionRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./src/middlewares/errorHandler');
const contactRoutes = require("./src/routes/contactRoutes");
const newsletterRoutes = require('./src/routes/newsletterRoutes');

// Charge les variables d'environnement
dotenv.config();

// Connexion à la BDD
const connectDB = require('./config/database');
connectDB();


// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Frontend uniquement
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
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
  name: "connect.sid",
  cookie: {
    secure: false, // passer à true en production avec HTTPS
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 180, // 180 minutes
  }
}));

// Montage des routes

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


app.use('/api/artists', require('./src/routes/artistsRoutes'));              // routes artistes                    // routes œuvres
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));                  // routes réservées aux admins
app.use('/api/auth', require('./src/routes/authRoutes'));                    // authentification
app.use('/api/uploads', require('./src/routes/uploadRoutes'));               // gestion des uploads
app.use('/api/works', require('./src/routes/worksRoutes'));
app.use("/api/contact", contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
// Pour rendre les fichiers statiques accessibles (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);
app.use('/api', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});


