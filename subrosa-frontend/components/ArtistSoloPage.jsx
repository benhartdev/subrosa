"use client";

import React from "react";
import Image from "next/image";
import ArtistProfile from "./ArtistProfile";
import Gallery from "/components/Gallery";
import "../styles/artistGallery.css";
import DoubleBorderContainer from "./DoubleBorderContainer";
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
            width={1000}
            height={1000}
          />
        </div>
      </section>

      {artist.works?.length > 0 && (
        <DoubleBorderContainer title="Les œuvres de l’artiste">
            <Gallery 
                items={artist.works} 
                fieldsToShow={['title', 'medium', 'dimensions']}
                type="works"/>
        </DoubleBorderContainer>

)}
            <ArtistProfile bio={artist.bio} artist={artist}  />
    </main>
  );
}
