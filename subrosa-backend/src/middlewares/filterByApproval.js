// middlewares/filterByApproval.js

const filterByApproval = (req, res, next) => {
    const sessionUser = req.session.user;
    const artistIdParam = req.params.id || req.body.artistId;
  
    // Par défaut, on filtre uniquement les œuvres validées
    req.approvalFilter = { isApproved: true };
  
    // Si admin : accès complet à tout
    if (sessionUser?.role === 'admin') {
      req.approvalFilter = {}; // pas de filtre
    }
  
    // Si artiste connecté, il consulte ses propres œuvres, validées ou non :
    if (
      sessionUser?.role === 'artist' &&
      artistIdParam &&
      sessionUser.id === artistIdParam
    ) {
      req.approvalFilter = {}; // l'artiste peut tout voir de lui-même
    }
  
    next();
  };
  
  module.exports = filterByApproval;
  