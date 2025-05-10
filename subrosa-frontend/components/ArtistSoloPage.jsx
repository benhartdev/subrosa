"use client";

import React from "react";
import Image from "next/image";
// import ArtistGallery from "./ArtistGallery";
import ArtistProfile from "./ArtistProfile";
// import MiniBarNav from "./MiniBarNav";
import Gallery from "/components/Gallery";
import "../styles/artistGallery.css";

export default function ArtistSoloPage({ artist }) {
  console.log("Données œuvres artiste :", artist.works);
const items = artist.works.map((work) => ({
  image: work.images?.[0]?.url || "/placeholder.jpg",
  title: work.title || "Sans titre",
  specialty: work.medium || "Technique inconnue",
  artistName: artist.username || "Artiste inconnu",
  excerpt: work.description || "",
  price: work.price || null,
  type: work.type || "Non spécifié",
  dimensions: work.dimensions || { height: 0, width: 0, depth: 0, unit: "cm" },
  id: work._id
}));
  return (
    <main className="artist-page">
      

      <section className="artist-intro">
        <p className="artist-subtitle">PORTRAIT</p>
        <h1 className="artist-name-main">{artist.username}</h1>
        <h2 className="artist-fullname">{artist.name}</h2>
      </section>

      <section className="artist-container">
        <div className="artist-featured">
          <Image
            src={artist.artistImages[1].url}
            alt={artist.artistImages[1].altText || `Portrait de ${artist.username}`}
            width={1000}
            height={1000}
          />
        </div>
      </section>

      <section className="artist-gallery-section">
        <div className="artist-gallery-title-wrapper">
          <h2 className="artist-gallery-title">Les œuvres de l’artiste</h2>
        </div>

        <div className="artist-gallery-wrapper">
          <div className="artist-gallery-inner">
   {artist.works?.length > 0 && (
 <Gallery 
  items={artist.works} 
  fieldsToShow={['title', 'medium', 'dimensions']}
/>
)}

          </div>
        </div>
      </section>

      <ArtistProfile bio={artist.bio} />
    </main>
  );
}
