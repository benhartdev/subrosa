const Artist = require('../models/Artists');
const User = require('../models/user');
const Artwork = require('../models/work');
const mongoose = require("mongoose");

const getStats = async (req, res) => {
  try {
    const totalArtists = await Artist.countDocuments();
    const approvedArtists = await Artist.countDocuments({ isApproved: true });
    const pendingArtists = await Artist.countDocuments({ isApproved: false });
    const totalUsers = await User.countDocuments();
    const totalWorks = await Artwork.countDocuments();
    const totalOrders = 0; 

    res.json({
      totalArtists,
      approvedArtists,
      pendingArtists,
      totalUsers,
      totalWorks,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération des stats", error });
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  console.log("🧨 Suppression demandée pour :", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.warn("❌ ID invalide :", id);
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      console.warn("❌ Artiste introuvable en base :", id);
      return res.status(404).json({ message: "Artiste non trouvé" });
    }
    res.status(200).json({ message: "✅ Artiste supprimé avec succès" });
  } catch (err) {
    console.error("💥 Erreur serveur :", err);
    res.status(500).json({ message: "Erreur lors de la suppression", error: err });
  }
};

module.exports = {
  getStats,
  deleteArtist,
};



