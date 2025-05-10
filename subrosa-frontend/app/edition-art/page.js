"use client";

import React from "react";
import Gallery from "../../components/Gallery";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/artistGallery.css";
import { useGalleryData } from "../../hooks/useGalleryData";

const EditionArtPage = () => {
  const { items, loading } = useGalleryData("works", "édition d'art");

  return (
    <main className="artist-page">
      <Header />

      <section className="artist-gallery-section">
        <div className="artist-gallery-wrapper">
          <div className="artist-gallery-title-wrapper">
            <h2 className="artist-gallery-title">Édition d’art</h2>
          </div>
          <div className="artist-gallery-inner">
            <Gallery
              items={items}
              loading={loading}
              type="works"
              fieldsToShow={["title", "medium", "dimensions", "artistName", "price"]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EditionArtPage;
