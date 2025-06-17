const mongoose = require("mongoose");
const slugify = require("slugify");
const Work = require("../src/models/work");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/subrosa-art";

async function generateWorkSlugs() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const works = await Work.find();

    for (const work of works) {
      const slug = slugify(work.title, { lower: true, strict: true });

      if (work.slug && work.slug === slug) {
        continue;
      }

      work.slug = slug;
      await work.save({ validateBeforeSave: false });

    }

  } catch (error) {
    console.error("❌ Erreur lors de la génération des slugs des œuvres :", error);
  } finally {
    await mongoose.disconnect();
  }
}

generateWorkSlugs();
