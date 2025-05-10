"use client";

import React from "react";
import "../../styles/artistGallery.css";
import Gallery from "../../components/Gallery";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useGalleryData } from "../../hooks/useGalleryData";

const  PaintPage = () => {
  const { items, loading } = useGalleryData("works", "Peinture");

  return (
    <main className="artist-page">
      <Header />
      
        <section className="artist-gallery-section">
          <div className="artist-gallery-wrapper">
            <div className="artist-gallery-title-wrapper">
              <h2 className="artist-gallery-title" style={{ fontSize: '4rem' }}>Peintures</h2>
           </div>
         </div>
            <div className="artist-gallery-inner">
      <Gallery 
            items={items} 
            loading={loading}
            fieldsToShow={['title', 'dimensions', 'type', 'artistName',]}
            type="works"/>
           </div>
        </section>
      <Footer />
    </main>
  );
}

export default PaintPage;