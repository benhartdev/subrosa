"use client";

import React from "react";
import Image from "next/image";
import ArtistProfile from "./ArtistProfile";
import Gallery from "./Gallery";
import styles from "./ArtistSoloPage.module.css"; // correction ici ✅
import DoubleBorderContainer from "./DoubleBorderContainer";


export default function ArtistSoloPage({ artist }) {
      console.log("Données œuvres artiste :", artist.works);

  return (
    <main className={styles.artistPage}>
      <section className={styles.artistIntro}>
        <p className={styles.artistSubtitle}>PORTRAIT</p>
        <h2 className={styles.artistUsername}>{artist.username}</h2>
        <h3 className={styles.artistName}>{artist.name}</h3>
      </section>

      <section className={styles.artistContainer}>
        <div className={styles.artistImage1}>
          <Image
            src={artist.artistImages[1]?.url || "/placeholder.jpg"}
            alt={artist.artistImages[1]?.altText || `Portrait de ${artist.username}`}
            width={700}
            height={700}
             style={{ objectFit: "contain", width: "100%", height: "auto" }}
            className={styles.mainArtworkImage} 
          />
        </div>
      </section>

      {artist.works?.length > 0 && (
        <div className={styles.galleryWorks}>
        <DoubleBorderContainer title="Les œuvres de l’artiste" >
          <Gallery
            items={artist.works}
            fieldsToShow={["title", "medium", "dimensions"]}
            type="works"
          />
        </DoubleBorderContainer>
        </div>
      )}

      <ArtistProfile bio={artist.bio} artist={artist} />
    </main>
  );
}