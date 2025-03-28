
const mongoose = require('mongoose');
const ArtworkSelectionSchema = new mongoose.Schema({
    
    artist: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },

});

const Artwork = mongoose.model('Artwork', ArtworkSelectionSchema);

module.export = mongoose;
