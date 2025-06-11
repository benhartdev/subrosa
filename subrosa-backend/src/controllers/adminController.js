const Artist = require('../models/Artists');
const User = require('../models/user');
const Artwork = require('../models/work');

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

module.exports = {
  getStats
};



