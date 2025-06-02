"use client";

import React from "react";
import styles from "./ArtistGallery.module.css";
import { useRouter } from "next/navigation";

const ArtistGallery = ({ images }) => {
  const router = useRouter();
  
  return (
    <div className={styles.artistGallery}>
      <div className={styles.artistGalleryGrid}>
        {images?.map((image, index) => {

  return (
          
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
            <button onClick={() => router.push(`/ajout-zooms/${image.id}`)}>
                ➕ Ajouter des zooms
           </button>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default ArtistGallery;
