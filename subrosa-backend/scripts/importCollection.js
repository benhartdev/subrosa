const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Argument ligne de commande : node scripts/importCollection.js artists Subrosa-art.Artists.json
const [,, modelName, fileName] = process.argv;

if (!modelName || !fileName) {
  console.error("❌ Usage: node scripts/importCollection.js <modelName> <file.json>");
  process.exit(1);
}

// 🔁 Dictionnaire de tes modèles
const models = {
  artists: require("../src/models/Artists"),
  users: require("../src/models/user"),
  works: require("../src/models/work"),
  orders: require("../src/models/Order"),
  
};

const Model = models[modelName.toLowerCase()];
if (!Model) {
  console.error(`❌ Modèle "${modelName}" introuvable.`);
  process.exit(1);
}

const MONGO_URI = "mongodb+srv://benhartdev:Defcrew78@cluster0.nm9zt.mongodb.net/subrosa?retryWrites=true&w=majority";

// 💫 Nettoyage du JSON si présence de $oid / $date
function cleanExtendedJSON(data) {
  return data.map(item => {
    const cleanItem = JSON.parse(JSON.stringify(item)
      .replace(/\{\s*"\$oid"\s*:\s*"([^"]+)"\s*\}/g, '"$1"')
      .replace(/\{\s*"\$date"\s*:\s*"([^"]+)"\s*\}/g, '"$1"')
    );
    return cleanItem;
  });
}

async function importCollection() {
  try {
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(__dirname, fileName);
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const rawData = JSON.parse(jsonData);

    const cleanData = cleanExtendedJSON(rawData);
    const result = await Model.insertMany(cleanData);

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur d'import :", err);
  }
}

importCollection();
