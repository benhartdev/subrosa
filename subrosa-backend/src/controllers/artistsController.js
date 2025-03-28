const Artist = require('../models/Artist');

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
    const artist = new Artist(req.body);
    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un artiste
exports.updateArtist = async (req, res) => {
    try {
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
