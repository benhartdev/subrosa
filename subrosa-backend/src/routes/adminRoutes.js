const express = require("express");
const router = express.Router();
const Artist = require("../models/Artists");
const User = require("../models/user");
const Work = require("../models/work");
const Order = require("../models/Order");
const { ensureAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");
const { getPendingArtists } = require("../controllers/artistsController");

router.get('/stats', ensureAdmin, adminController.getStats);
router.get("/artists/pending", ensureAdmin, getPendingArtists);


// GET artistes en attente
router.get("/artists", ensureAdmin, async (req, res) => {
    try {
      const { status } = req.query;
      const query = status ? { status } : {}; // exemple : ?status=pending
      const artists = await Artist.find(query);
      res.json(artists);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération des artistes" });
    }
  });
  
// PATCH valider ou refuser artiste
router.patch("/artists/:id/approval", ensureAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'validated', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!artist) {
      return res.status(404).json({ message: "Artiste non trouvé" });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut de l’artiste", error: err.message });
  }
});

  
//   GET œuvres
router.get("/works", ensureAdmin, async (req, res) => {
    try {
      const works = await Work.find();
      res.json(works);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement œuvres" });
    }
  });

// DELETE œuvre
  router.delete("/works/:id", ensureAdmin, async (req, res) => {
    try {
      await Work.findByIdAndDelete(req.params.id);
      res.json({ message: "Œuvre supprimée" });
    } catch (err) {
      res.status(500).json({ message: "Erreur suppression œuvre" });
    }
  });

// GET utilisateurs
  router.get("/users", ensureAdmin, async (req, res) => {
    try {
      const users = await User.find({ isAdmin: false });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement utilisateurs" });
    }
  });
  
//   DELETE utilisateur
  router.delete("/users/:id", ensureAdmin, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(500).json({ message: "Erreur suppression utilisateur" });
    }
  });
  
//   GET commandes
  router.get("/orders", ensureAdmin, async (req, res) => {
    try {
      const orders = await Order.find().populate("userId");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement commandes" });
    }
  });
  
module.exports = router;
