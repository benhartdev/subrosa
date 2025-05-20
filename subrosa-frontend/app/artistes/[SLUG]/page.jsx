import React from "react";
import axios from "axios";
import ArtistSoloPage from "../../../components/ArtistSoloPage";

// ✅ récupère correctement les params de l'URL
export default async function ArtistPage({ params }) {
      console.log("params :", params);
  const slug = params.slug;
      console.log("SLUG reçu :", slug);

  const artist = await getArtist(slug);

  if (!artist) {
    return <div>Erreur : Artiste introuvable</div>;
  }

    return (
      <>
        <ArtistSoloPage artist={artist} />
      </>
  );
}

// ✅ Appel du backend
async function getArtist(slug) {
  try {

    const res = await axios.get(`http://localhost:5000/api/artists/slug/${slug}`);
    return res.data;
    
  } catch (error) {
    console.error("Erreur dans getArtist:", error);
    return null;
  }
}
