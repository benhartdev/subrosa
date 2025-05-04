// middlewares/ensureValidatedArtist.js
const Artist = require('../models/Artists');

const ensureValidatedArtist = async (req, res, next) => {
  const user = req.session?.user;

  if (!user || user.role !== 'artist') {
    return res.status(403).json({ message: "Accès interdit : artiste non connecté" });
  }

  const artist = await Artist.findById(user.id);
  if (!artist || artist.status !== 'validated') {
    return res.status(403).json({ message: "Votre compte n'a pas encore été validé." });
  }

  next();
};

module.exports = ensureValidatedArtist;
