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
        {/* <h1 className={styles.artistNameMain}>{artist.username}</h1> */}
        <h2 className={styles.artistFullname}>{artist.name}</h2>
      </section>

      <section className={styles.artistContainer}>
        <div className={styles.artistFeatured}>
          <Image
            src={artist.artistImages[1]?.url || "/placeholder.jpg"}
            alt={artist.artistImages[1]?.altText || `Portrait de ${artist.username}`}
            width={1000}
            height={1000}
          />
        </div>
      </section>

      {artist.works?.length > 0 && (
        <DoubleBorderContainer title="Les œuvres de l’artiste">
          <Gallery
            items={artist.works}
            fieldsToShow={["title", "medium", "dimensions"]}
            type="works"
          />
        </DoubleBorderContainer>
      )}

      <ArtistProfile bio={artist.bio} artist={artist} />
    </main>
  );
}