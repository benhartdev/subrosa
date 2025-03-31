const Artist = require('../models/Artist');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');


// Récupérer tous les artistes
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un nouvel artiste
exports.createArtist = async (req, res) => {
    const artist = new Artist({
        ...req.body,
        old_exhibitions: req.body.old_exhibitions || [],
        future_exhibitions: req.body.future_exhibitions || [],
        status: 'pending', // ✅ force le statut à "pending"
    });

    try {
        const newArtist = await artist.save();
        await sendConfirmationEmail(newArtist.email, newArtist.name);

        res.status(201).json(newArtist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un artiste
exports.updateArtist = async (req, res) => {
    try {
        if (!req.body.old_exhibitions) req.body.old_exhibitions = [];
        if (!req.body.future_exhibitions) req.body.future_exhibitions = [];

        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedArtist) return res.status(404).json({ message: 'Artiste non trouvé' });
        res.json(updatedArtist);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un artiste
exports.deleteArtist = async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if (!deletedArtist) return res.status(404).json({ message: 'Artiste non trouvé' });
        res.json({ message: 'Artiste supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Fonction pour récupérer des œuvres aléatoires
exports.getRandomArtworks = async (req, res) => {
    try {
        const randomArtworks = await Artist.aggregate([{ $sample: { size: 5 } }]); // On récupère 5 œuvres au hasard
        res.json(randomArtworks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des œuvres aléatoires.", error: error.message });
    }
};

// ✅ Obtenir tous les artistes en attente de validation
exports.getPendingArtists = async (req, res) => {
    try {
      const pendingArtists = await Artist.find({ status: 'pending' });
      res.status(200).json(pendingArtists);
    } catch (error) {
      console.error("Erreur getPendingArtists :", error);
      res.status(500).json({ message: 'Erreur lors de la récupération des artistes.' });
    }
  };
  
  // ✅ Valider ou rejeter un artiste
  exports.updateArtistStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['validated', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Statut invalide.' });
      }
  
      const artist = await Artist.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!artist) {
        return res.status(404).json({ message: 'Artiste non trouvé.' });
      }
  
      res.status(200).json(artist);
    } catch (error) {
      console.error("Erreur updateArtistStatus :", error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du statut.' });
    }
  };
  
  