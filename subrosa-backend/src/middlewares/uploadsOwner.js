// middlewares/uploadsOwner.js

const uploadsArtistOwner = (req, res, next) => {
    const sessionUser = req.session?.user;
    const targetArtistId = req.params.artistId;
  
    if (!sessionUser) {
      return res.status(401).json({ message: "Non authentifié" });
    }
  
    const isOwner = sessionUser.role === 'artist' && sessionUser.id === targetArtistId;
    const isAdmin = sessionUser.role === 'admin';
  
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Accès interdit : Admin ou Artiste seulement" });
    }
  
    next();
  };
  
  module.exports = uploadsArtistOwner;
  