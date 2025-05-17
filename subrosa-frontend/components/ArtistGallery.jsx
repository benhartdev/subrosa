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
              <h3 className="artwork-title">{image.title || "titre de l'oeuvre"}</h3>
              <div className="artwork-divider" />
              <p className="artwork-date">
                  {image.date
                    ? `Ajouté le ${new Date(image.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "Date de création"}
             </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
