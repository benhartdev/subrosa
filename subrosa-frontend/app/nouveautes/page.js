"use client";

import React from "react";
import Gallery from "../../components/Gallery";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/artistGallery.css";
import { useGalleryData } from "../../hooks/useGalleryData";

const NouveautesPage = () => {
  const { items, loading } = useGalleryData("latest");

  return (
    <main className="artist-page">
      <Header />

      <section className="artist-gallery-section">
        <div className="artist-gallery-wrapper">
          <div className="artist-gallery-title-wrapper">
            <h2 className="artist-gallery-title"style={{ fontSize: '4rem' }}>Nouveautés</h2>
          </div>
          <div className="artist-gallery-inner">
            <Gallery 
              items={items}
              loading={loading}
              type="works"
              fieldsToShow={["title", "medium", "dimensions", "artistName"]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NouveautesPage;
