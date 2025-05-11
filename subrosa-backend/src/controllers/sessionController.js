
function checkSession(req, res) {
  if (req.session?.user?.role === "admin") {
    res.json({ status: 'admin', username: req.session.user.username, role: 'admin' });
  } else if (req.session?.user?.role === "artist") {
    res.json({ status: 'artist', artistId: req.session.user.id, username: req.session.user.username, role: 'artist' });
  } else {
    res.status(401).json({ status: 'unauthenticated' });
  }
}
  module.exports = {
    checkSession,
  };
  