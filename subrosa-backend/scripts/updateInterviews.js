
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const Artist = require('../src/models/Artists');

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function updateArtistsInterviewField() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    const artistsWithoutInterview = await Artist.find({
      $or: [
        { interview: { $exists: false } },
        { interview: null }
      ]
    });


    const updates = await Promise.all(
      artistsWithoutInterview.map(artist =>
        Artist.findByIdAndUpdate(
          artist._id,
          {
            $set: {
              interview: {
                question1: "",
                question2: "",
                question3: ""
              }
            }
          },
          { new: true }
        )
      )
    );


    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
  }
}

updateArtistsInterviewField();
