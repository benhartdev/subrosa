"use client";

import React from "react";
import ArtistImage from "./ArtistImage";
import "../styles/artistGallery.css";

const ArtistGallery = ({ images }) => {
  return (
    <div className="artist-gallery">
      <div className="artist-gallery__grid">
      {images?.map((image, index) => (
  <div key={index} className="artist-gallery__item">
    <div className="artwork-card">
      <div className="artwork-image-box">
        <ArtistImage src={image.src} alt={image.alt} />
      </div>
      
    </div>
    <div className="artwork-info">
        <h3 className="artwork-title">{image.title || "Titre de l’œuvre"}</h3>
        <div className="artwork-divider" />
        <p className="artwork-price">{image.price || "1234€"}</p>
      </div>
  </div>
))}
      </div>
    </div>
  );
};

export default ArtistGallery;
