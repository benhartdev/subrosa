"use client";

import React from "react";
import styles from "./ArtistGallery.module.css";

const ArtistGallery = ({ images }) => {
  return (
    <div className={styles.artistGallery}>
      <div className={styles.artistGalleryGrid}>
        {images?.map((image, index) => (
          <div key={image.id || index} className={styles.artistGalleryItem}>
            <div className={styles.artworkCard}>
              <div className={styles.artworkImageBox}>
                {image.src && (
                  <img
                    src={image.src}
                    alt={image.alt || `portrait d'artiste`}
                    className={styles.artistGalleryImage}
                  />
                )}
              </div>
            </div>
            <div className={styles.artworkInfo}>
              <h3 className={styles.artworkTitle}>
                {image.title || "titre de l'oeuvre"}
              </h3>
              <div className={styles.artworkDivider} />
              <p className={styles.artworkDate}>
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
