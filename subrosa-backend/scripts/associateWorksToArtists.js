const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Artist = require("../src/models/Artists");
const Work = require("../src/models/work");

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const works = await Work.find();

    for (const work of works) {
      const artistId = work.artistId;
      if (!artistId) {
        console.warn(`⚠️  L'œuvre ${work._id} n'a pas d'artistId.`);
        continue;
      }

      await Artist.findByIdAndUpdate(
        artistId,
        { $addToSet: { works: work._id } }, // évite les doublons
        { new: true }
      );

    }

  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
