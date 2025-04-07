const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getRandomArtworks,
  updateArtistStatus,
  getPendingArtists
} = require('../controllers/artistsController');


router.get('/artists', getAllArtists);
router.post('/artists', createArtist);
router.put('/artists/:id', updateArtist);
router.delete('/artists/:id', deleteArtist);
router.get('/artworks/random', getRandomArtworks);
router.get('/artists/pending', getPendingArtists);
router.put('/artists/:id/status', updateArtistStatus);
router.get('/artists/pending', artistsController.getPendingArtists);
router.put('/artists/:id/status', artistsController.updateArtistStatus);

module.exports = router;
