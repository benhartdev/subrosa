function checkSession(req, res) {
    if (req.session && req.session.isAdmin) {
      res.json({ status: 'admin', username: req.session.username });
    } else if (req.session && req.session.isArtist) {
      res.json({ status: 'artist', artistId: req.session.artistId });
    } else {
      res.status(401).json({ status: 'unauthenticated' });
    }
  }
  
  module.exports = {
    checkSession,
  };
  