"use client";

import React from "react";
import Image from "next/image";
import ArtistProfile from "./ArtistProfile";
import Gallery from "/components/Gallery";
import "../styles/artistGallery.css";

export default function ArtistSoloPage({ artist }) {
      console.log("Données œuvres artiste :", artist.works);

  return (
    <main className="artist-page">
      <section className="artist-intro">
        <p className="artist-subtitle">PORTRAIT</p>
           {/* <h1 className="artist-name-main">{artist.username}</h1> */}
        <h2 className="artist-fullname">{artist.name}</h2>
      </section>

      <section className="artist-container">
        <div className="artist-featured">
          <Image
            src={artist.artistImages[1].url || "/placeholder.jpg"}
            alt={artist.artistImages[1].altText || `Portrait de ${artist.username}`}
            width={4000}
            height={4000}
          />
        </div>
      </section>

      {artist.works?.length > 0 && (
      <section className="artist-gallery-section">
        <div className="artist-gallery-title-wrapper">
          <h2 className="artist-gallery-title">Les œuvres de l’artiste</h2>
        </div>
        <div className="artist-gallery-wrapper">
          <div className="artist-gallery-inner">
            <Gallery 
                items={artist.works} 
                fieldsToShow={['title', 'medium', 'dimensions']}
                type="works"
              />
          </div>
        </div>
      </section>
)}
            <ArtistProfile bio={artist.bio} artist={artist}  />
    </main>
  );
}
