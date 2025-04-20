const express = require("express");
const router = express.Router();
const Artist = require("../models/Artists");
const User = require("../models/user");
const Work = require("../models/work");
const Order = require("../models/Order");
const { ensureAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");


router.get('/stats', adminController.getStats);




// GET artistes en attente
router.get("/artists", async (req, res) => {
    try {
      const { isApproved } = req.query;
      const query = isApproved !== undefined ? { isApproved: isApproved === "true" } : {};
      const artists = await Artist.find(query);
      res.json(artists);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la récupération des artistes" });
    }
  });
  
// PATCH valider ou refuser artiste
  router.patch("/artists/:id/approval", async (req, res) => {
    try {
      const { isApproved } = req.body;
      const artist = await Artist.findByIdAndUpdate(req.params.id, { isApproved }, { new: true });
      res.json(artist);
    } catch (err) {
      res.status(500).json({ message: "Erreur validation artiste" });
    }
  });
  
//   GET œuvres
router.get("/works", async (req, res) => {
    try {
      const works = await Work.find();
      res.json(works);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement œuvres" });
    }
  });

// DELETE œuvre
  router.delete("/works/:id", async (req, res) => {
    try {
      await Work.findByIdAndDelete(req.params.id);
      res.json({ message: "Œuvre supprimée" });
    } catch (err) {
      res.status(500).json({ message: "Erreur suppression œuvre" });
    }
  });

// GET utilisateurs
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({ isAdmin: false });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement utilisateurs" });
    }
  });
  
//   DELETE utilisateur
  router.delete("/users/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(500).json({ message: "Erreur suppression utilisateur" });
    }
  });
  
//   GET commandes
  router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find().populate("userId");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Erreur chargement commandes" });
    }
  });
  
module.exports = router;
