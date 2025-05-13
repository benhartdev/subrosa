// /components/GalleryPage.jsx
"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import { useGalleryData } from "../hooks/useGalleryData";
import "../styles/artistGallery.css";

export default function GalleryPage({ type, subtype, title, fieldsToShow }) {
  const { items, loading } = useGalleryData(type, subtype);

  return (
    <main className="artist-page">
      <Header />
      <section className="artist-gallery-section">
        <div className="artist-gallery-wrapper">
          <div className="artist-gallery-title-wrapper">
            <h2 className="artist-gallery-title">{title}</h2>
          </div>

          <div className="artist-gallery-inner">
            {items.length === 0 && !loading ? (
              <p style={{ color: "#999", textAlign: "center", marginTop: "2rem" }}>
                Aucun élément à afficher.
              </p>
            ) : (
              <Gallery
                items={items}
                loading={loading}
                fieldsToShow={fieldsToShow}
                type={type}
              />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
