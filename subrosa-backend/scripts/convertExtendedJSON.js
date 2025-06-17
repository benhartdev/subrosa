const fs = require("fs");

const extended = require("./Subrosa-art.Artists.json");

// Nettoie les $oid et $date
const clean = extended.map((artist) => {
  const cleanArtist = {
    ...artist,
    _id: artist._id?.$oid || artist._id,
    images: artist.images?.map((img) => ({
      ...img,
      _id: img._id?.$oid || img._id,
      uploadedAt: img.uploadedAt?.$date || img.uploadedAt,
    })) || [],
    works: artist.works?.map((w) => w?.$oid || w) || [],
  };

  return cleanArtist;
});

fs.writeFileSync("scripts/clean_artists.json", JSON.stringify(clean, null, 2), "utf-8");
