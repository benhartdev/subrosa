const mongoose = require('mongoose');


const ArtistSchema = new mongoose.Schema({
    Id: String,
    imageUrl1: String,
    imageUrl2: String,
    imageUrl3: String,
    imageUrl4: String,
    name: String,
    country_location: String,
    city_location: String,
    date_of_birth: String,
    craft: String,
    technical_skills: String,
    description: String,
    bio: String,
    future_exhibitions: [String],
    old_exhibitions: [String],
    email: String,
    number: String,
    website: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    date_of_entry: String,
    numers_of_artworks: String,
    number_of_artworks_in_stock: String,
    past_sales: String,
    past_orders: String,
    orders_in_progress: String,
    followers: String,
    interview: String,
    isApproved: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'validated', 'rejected'],
        default: 'pending',
      }
    
});
module.exports = mongoose.model('Artist', ArtistSchema, 'Artists');
