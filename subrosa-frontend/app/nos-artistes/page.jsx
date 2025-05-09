"use client";

import React from "react";
import Gallery from "../../components/Gallery";
import "../../styles/artistGallery.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useGalleryData } from "../../hooks/useGalleryData";


const ArtistPage = () => {
  const { items, loading } = useGalleryData("artist");

 
  return (
    <main className="artist-page">
      <Header />
      
  <section className="artist-gallery-section">
    <div className="artist-gallery-wrapper">
      <div className="artist-gallery-title-wrapper">
        <h2 className="artist-gallery-title">Nos artistes</h2>
      </div>
    </div>

      <div className="artist-gallery-inner">
        <Gallery items={items} loading={loading} type="artist" />
      </div>

</section>


      <Footer />
    </main>
  );
};

export default ArtistPage;
