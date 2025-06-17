const express = require('express');
const router = express.Router();
const Work = require('../models/work');
const Artist = require('../models/Artists');
const { ensureAdmin, ensureArtist } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig'); 
const filterByApproval = require('../middlewares/filterByApproval');
const slugify = require('slugify');

// Récupérer toutes les œuvres non validées
router.get('/pending', ensureAdmin, async (req, res) => {
  try {
    const pending = await Work.find({ isApproved: false }).populate('artistId', 'username');
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération œuvres non validées' });
  }
});

// Récupérer les œuvres validées par date de création (les plus récentes en premier)
router.get("/latest", async (req, res) => {
  try {
    const latestWorks = await Work.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("artistId");

    res.json(latestWorks);
  } catch (error) {
    console.error("Erreur lors de la récupération des nouveautés :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


router.get('/', filterByApproval, async (req, res) => {
  try {
    const query = { ...req.approvalFilter };

    if (req.query.type) {
      query.type = req.query.type;
    }

    const works = await Work.find(query).populate('artistId');
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres." });
  }
});

// Récupérer les œuvres validées uniquement
router.get('/validated', async (req, res) => {
  try {
    const works = await Work.find({ status: 'validated' });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres validées." });
  }
});

// ✅ Route pour récupérer une œuvre par son _id
router.get('/:id', async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: "Œuvre non trouvée" });
    res.status(200).json(work);
  } catch (error) {
    console.error("Erreur récupération œuvre :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});


// Route spéciale pour récupérer TOUTES les œuvres de l’artiste connecté
router.get('/all-by-artist/:id', async (req, res) => {
  try {
    const artistId = req.params.id;
    const works = await Work.find({ artistId });
    res.status(200).json(works);
  } catch (error) {
    console.error("Erreur récupération œuvres artiste :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/works/random, HomePage - selection du moment
router.get('/random', async (req, res) => {
  try {
    const works = await Work.aggregate([
      { $match: { isApproved: true } }, // 🟢 uniquement les œuvres validées
      {
        $group: {
          _id: "$artistId",              // 🔁 groupement par artiste
          doc: { $first: "$$ROOT" }      // 👈 on prend la 1re œuvre par artiste
        }
      },
      { $replaceRoot: { newRoot: "$doc" } }, // 🧼 on remet le doc original
      { $sample: { size: 6 } }               // 🎲 6 œuvres aléatoires (modifie si besoin)
    ]);

    res.json(works);
  } catch (error) {
    console.error("❌ Erreur lors du fetch des œuvres aléatoires :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// (optionnel) Récupérer les œuvres d’un artiste spécifique
router.get('/artist/:id', filterByApproval, async (req, res) => {
  try {
    const artistId = req.params.id;
    const works = await Work.find({ artistId, ...req.approvalFilter });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres de l'artiste." });
  }
});

router.post('/by-artist', ensureArtist, async (req, res) => {
  try {
    // Création de l’œuvre
    const newWork = new Work(req.body);
    const savedWork = await newWork.save();

    // Récupération de l'ID de l'artiste connecté via la session
    const artistId = req.session.user._id;

    // Ajout de l'œuvre à l'artiste
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      { $push: { works: savedWork._id } },
      { new: true }
    ).populate('works');

    res.status(201).json({
      message: 'Œuvre ajoutée et associée à l’artiste',
      work: savedWork,
      updatedArtist
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de l’œuvre." });
  }
});

// Route : POST /api/works/artist/add
router.post('/by-admin/:artistId', ensureAdmin, async (req, res) => {
  try {
    const artistId = req.params.artistId;

    // Crée l’œuvre avec artistId injecté manuellement
    const newWork = new Work({ ...req.body, artistId });
    const savedWork = await newWork.save();

    // Mets à jour le document artiste avec l'ID de l’œuvre
    await Artist.findByIdAndUpdate(
      artistId,
      { $push: { works: savedWork._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Œuvre ajoutée et associée à l’artiste.",
      work: savedWork
    });
  } catch (err) {
    console.error("❌ Erreur ajout œuvre admin :", err);
    res.status(500).json({ error: "Erreur serveur lors de la création de l’œuvre." });
  }
});


// ✅ Nouvelle route artiste avec upload d’une seule oeuvre avec plusieurs images de celle ci
router.post('/artist/add', upload.array('images', 10), async (req, res) => {
  try {

    // ✅ Vérification présence fichiers image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Aucune image n’a été envoyée." });
    }

    // ✅ Prendre l’ID depuis la session
    const artistId = req.session?.user?._id || req.session?.user?.id
    if (!artistId) {
      return res.status(401).json({ message: "Utilisateur non connecté ou session expirée." });
    };

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artiste introuvable." });
    }

    // ✅ Limite d'œuvres pour artistes non validés
    if (artist.status !== 'validated') {
      const currentCount = await Work.countDocuments({ artistId });
      if (currentCount >= 6) {
        return res.status(403).json({
          message: "Vous pouvez soumettre jusqu'à 6 œuvres avant validation de votre profil."
        });
      }
    }

    const {
      type,
      title,
      description,
      creation_date,
      medium,
      price,
      currency,
      in_stock,
      status,
      dominant_colors,
      themes,
      dimensions
    } = req.body;

    // 🔧 Génération du slug
const slug = slugify(`${title}-${Date.now()}`, {
  lower: true,
  strict: true
});

    const finalDimensions = {
      height: Number(dimensions.height),
      width: Number(dimensions.width),
      depth: dimensions.depth ? Number(dimensions.depth) : null,
      unit: dimensions.unit || 'cm',
    };

    const altTexts = req.body.altText;
    const normalizedAltTexts = Array.isArray(altTexts) ? altTexts : [altTexts];

    const images = req.files.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      altText: normalizedAltTexts[index] || 'Image sans texte alternatif',
    }));

    // ✅ Sécurité anti vide
    if (images.length === 0) {
      return res.status(400).json({ message: "Une œuvre doit contenir au moins une image." });
    }

    const newWork = new Work({
      type,
      title,
       slug,
      description,
      creation_date,
      medium,
      price: Number(price),
      currency,
      in_stock: Number(in_stock),
      status,
      dominant_colors,
      themes,
      artistId,
      dimensions: finalDimensions,
      images,
      isApproved: false, // reste en attente
    });

    await newWork.save();

    // 🔁 Mise à jour de l'artiste avec l'œuvre ajoutée
    await Artist.findByIdAndUpdate(
      artistId,
      { $push: { works: newWork._id } },
      { new: true }
    );

    res.status(201).json(newWork);

  } catch (error) {
    console.error('❌ Erreur ajout œuvre :', error);
    res.status(500).json({
      message: "Erreur lors de la soumission de l’œuvre.",
      details: error.message
    });
  }
});

// ✅ Route admin pour ajouter plusieurs œuvres à un artiste
router.post('/bulk/:artistId', ensureAdmin, async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const works = req.body;

    if (!Array.isArray(works)) {
      return res.status(400).json({ message: "Le body doit contenir un tableau d'œuvres." });
    }

    const worksWithArtist = works.map(work => ({ ...work, artistId }));

    const savedWorks = await Work.insertMany(worksWithArtist);

    await Artist.findByIdAndUpdate(artistId, {
      $push: { works: { $each: savedWorks.map(w => w._id) } }
    });

    res.status(201).json({ message: "Œuvres ajoutées avec succès", works: savedWorks });
  } catch (err) {
    console.error("❌ Erreur ajout multiple d’œuvres :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// Route protégée pour ajouter une œuvre (admin uniquement)
router.post('/add', ensureAdmin, async (req, res) => {
  const { title, artist, imageUrl, description, price } = req.body;
  try {
    const newArtwork = new Artwork({ title, artist, imageUrl, description, price });
    await newArtwork.save();
    res.status(201).json({ message: 'Œuvre ajoutée avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'œuvre.' });
  }
});

// Route POST JSON protégée (admin uniquement) pour ajout direct d'œuvre
router.post("/json", ensureAdmin, async (req, res) => {
  try {
    const newWork = new Work(req.body);
    const savedWork = await newWork.save();
    res.status(201).json(savedWork);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de l'œuvre JSON :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'œuvre." });
  }
});

// Récupérer une œuvre par son Slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const work = await Work.findOne({ slug: req.params.slug }).populate('artistId');

    if (!work) {
      return res.status(404).json({ message: "Œuvre non trouvée" });
    }

    // Autoriser l'accès uniquement si validée ou accès admin
    const isAdmin = req.query.admin === 'true';
    if (!work.isApproved && !isAdmin) {
      return res.status(403).json({ message: "Œuvre en attente de validation" });
    }

    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// route PATCH pour mettre à jour une œuvre - images
router.patch('/:id/images', ensureAdmin, async (req, res) => {
  try {
    const { newImages } = req.body;

    if (!Array.isArray(newImages) || newImages.length === 0) {
      return res.status(400).json({ message: "Aucune image fournie." });
    }

    const updatedWork = await Work.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: newImages } } },
      { new: true }
    );

    res.status(200).json({
      message: `${newImages.length} image(s) ajoutée(s) avec succès.`,
      work: updatedWork
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout d'images :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout d'images." });
  }
});
// route POST pour ajouter des zooms a une œuvre via id - 6 images max
router.post('/:id/add-zoom', upload.array('images', 6), async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Œuvre introuvable." });
    }

    const altTexts = req.body.altText;
    const normalizedAltTexts = Array.isArray(altTexts) ? altTexts : [altTexts];

    const newImages = req.files.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      altText: normalizedAltTexts[index] || 'Zoom sans description',
    }));

    work.images.push(...newImages);
    await work.save();

    res.status(200).json({ message: "Zooms ajoutés avec succès", work });
  } catch (error) {
    res.status(500).json({ message: "Erreur ajout des zooms", error });
  }
});

// Valider une œuvre
router.patch('/:id/validate', ensureAdmin, async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la validation de l’œuvre." });
  }
});

// Rejeter / supprimer une œuvre
router.delete('/:id', ensureAdmin, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Œuvre supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l’œuvre." });
  }
});




// Récupérer les editions d'art
router.get("/", async (req, res) => {
  const filter = { isApproved: true };
  if (req.query.type) {
    filter.type = req.query.type;
  }

  const works = await Work.find(filter).populate("artistId");
  res.json(works);
});



module.exports = router;
