"use client";

import React from "react";
import Image from "next/image";
import ArtistGallery from "./ArtistGallery";
import ArtistProfile from "./ArtistProfile";
import MiniBarNav from "./MiniBarNav";

import "../styles/artistGallery.css";

export default function ArtistSoloPage({ artist }) {
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
            src={artist.mainImage}
            alt={`Portrait de ${artist.username}`}
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
            <ArtistGallery images={artist.images} />
          </div>
        </div>
      </section>

      <ArtistProfile bio={artist.bio} />
    </main>
  );
}
