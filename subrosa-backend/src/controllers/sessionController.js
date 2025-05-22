function checkSession(req, res) {
  if (req.session?.user) {
    const { id, username, role } = req.session.user;

    return res.json({
      authenticated: true,
      user: {
        id,
        username,
        role,
      },
    });
  } else {
    return res.status(401).json({ authenticated: false, message: "Non authentifié" });
  }
}

module.exports = { checkSession };
