"use client";

import React from "react";
import ArtistProfile from "../../components/ArtistProfile";
import ArtistGallery from "../../components/ArtistGallery";
import "../../styles/artistGallery.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Breadcrumb from '../../components/Breadcrumb';

const ArtistPage = () => {
  const galleryImages = [
    { src: "/images/indian_express_1.jpg", alt: "Artwork 1", title: "Indian Express 1", price: "1500€" },
    { src: "/images/indian_express_2.jpg", alt: "Artwork 2", title: "Indian Express 2", price: "1500€" },
    { src: "/images/INDIAN_GAME.jpg", alt: "Artwork 3", title: "Indian Game", price: "1500€" },
    { src: "/images/EQUITY.jpg", alt: "Artwork 4",  title: "La Défense", price: "1500€" },
    { src: "/images/AURORA.jpg", alt: "Artwork 4",  title: "La Défense", price: "1500€" },
    { src: "/images/FIRST_PRINT.jpg", alt: "Artwork 4",  title: "La Défense", price: "1500€" },
  ];

  return (
    <main className="artist-page">
      <Header />
      <Breadcrumb />
      <section className="artist-intro">
        <p className="artist-subtitle">PORTRAIT</p>
        <h1 className="artist-name-main">Ben H</h1>
        <h2 className="artist-fullname">BENJAMIN HOFFELE</h2>
      </section>

      <section className="artist-container">
        <div className="artist-featured">
          <Image src="/images/Ben_H_multi.jpg" alt="Portrait de Ben H" width={1000} height={1000}/>
        </div>
      </section>

      <section className="artist-gallery-section">
  <div className="artist-gallery-title-wrapper">
    <h2 className="artist-gallery-title">Les œuvres de l’artiste</h2>
  </div>

  <div className="artist-gallery-wrapper">
    <div className="artist-gallery-inner">
      <ArtistGallery images={galleryImages} />
    </div>
  </div>
</section>

<ArtistProfile />
      <Footer />
    </main>
  );
};

export default ArtistPage;
