function checkSession(req, res) {
  if (req.session?.user) {
    const { id, username, role, artistId, name, } = req.session.user;

    return res.json({
      authenticated: true,
      user: {
        id,
        username,
        role,
        artistId,
        name,
      },
    });
  } else {
    return res.status(401).json({ authenticated: false, message: "Non authentifié" });
  }
}

module.exports = { checkSession };
