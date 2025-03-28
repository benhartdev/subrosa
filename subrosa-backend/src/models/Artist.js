const mongoose = require('mongoose');


const ArtistSchema = new mongoose.Schema({
    Id: String,
    imageUrl: String,
    name: String,
    location: String,
    description: String,
    bio: String,
    future_exibitions: String,
    email: String,
    number: String,
    website: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    date_of_entry: String,
    numers_of_Artworks: String,
    number_of_artworks_in_stock: String,
    past_sales: String,
    past_orders: String,
    orders_in_progress: String,
    followers: String,
});
module.exports = mongoose.model('Artist', ArtistSchema, 'Artists');
