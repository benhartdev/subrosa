const express = require("express");
const router = express.Router();
const BlockedIP = require("../models/BlockedIP");

// Ajouter une IP à la liste noire
router.post("/", async (req, res) => {
  const { ip, reason } = req.body;

  if (!ip) return res.status(400).json({ error: "IP manquante" });

  try {
    const newBlock = new BlockedIP({ ip, reason });
    await newBlock.save();
    res.status(201).json({ message: `IP ${ip} bloquée.` });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du blocage de l'IP" });
  }
});

// Liste des IP bloquées
router.get("/", async (req, res) => {
  try {
    const blocked = await BlockedIP.find();
    res.json(blocked);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// Supprimer une IP bloquée
router.delete("/:ip", async (req, res) => {
  const { ip } = req.params;
  try {
    const result = await BlockedIP.findOneAndDelete({ ip });
    if (!result) return res.status(404).json({ error: "IP non trouvée" });
    res.json({ message: `IP ${ip} débloquée.` });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur lors du déblocage" });
  }
});

module.exports = router;
