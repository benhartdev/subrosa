const mongoose = require("mongoose");
const slugify = require("slugify");
const Work = require("../src/models/work");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/subrosa-art";

async function generateWorkSlugs() {
  try {
    console.log("📡 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connexion MongoDB établie.");

    const works = await Work.find();
    console.log(`🖼️ ${works.length} œuvres trouvées.`);

    for (const work of works) {
      const slug = slugify(work.title, { lower: true, strict: true });

      if (work.slug && work.slug === slug) {
        console.log(`➡️ Slug déjà existant pour ${work.title} → ${work.slug}`);
        continue;
      }

      work.slug = slug;
      await work.save({ validateBeforeSave: false });

      console.log(`✅ Slug ajouté pour ${work.title} → ${work.slug}`);
    }

    console.log("🎉 Slugs des œuvres générés avec succès.");
  } catch (error) {
    console.error("❌ Erreur lors de la génération des slugs des œuvres :", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion de MongoDB.");
  }
}

generateWorkSlugs();
