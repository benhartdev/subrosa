"use client";

import React from "react";
import ArtistGallery from "../../components/ArtistGallery";
import "../../styles/artistGallery.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const ArtistPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((artist) => ({
          src: artist.mainImage,
          alt: `Portrait de ${artist.name}`,
          title: artist.name || artist.username,
          price: artist.price || "", // si tu veux afficher autre chose
          id: artist._id
        }));
        setGalleryImages(formatted);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des artistes :", error);
      });
  }, []);
  return (
    <main className="artist-page">
      <Header />
      
      <section className="artist-gallery-section">
  <div className="artist-gallery-title-wrapper">
    <h2 className="artist-gallery-title">Nos artistes</h2>
  </div>

  <div className="artist-gallery-wrapper">
    <div className="artist-gallery-inner">
      <ArtistGallery images={galleryImages} />
    </div>
  </div>
</section>


      <Footer />
    </main>
  );
};

export default ArtistPage;
