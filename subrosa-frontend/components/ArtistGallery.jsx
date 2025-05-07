"use client";

import React from "react";
import ArtistImage from "./ArtistImage";
import "../styles/artistGallery.css";

const ArtistGallery = ({ images }) => {
  return (
    <div className="artist-gallery">
      <div className="artist-gallery-grid">
        {images?.map((image, index) => (
          <div key={image.id || index} className="artist-gallery-item">
            <div className="artwork-card">
              <div className="artwork-image-box">
                {image.src && (
                  <ArtistImage
                    src={image.src}
                    alt={image.alt || `portrait d’artiste`}
                  />
                )}
              </div>
            </div>
            <div className="artwork-info">
              <h3 className="artwork-title">{image.name || "Nom de l’artiste"}</h3>
              <div className="artwork-divider" />
              <p className="artwork-skill">{image.technical_skills || "Style artistique"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
