"use client";
import React from "react";
import Image from "next/image";
import styles from "./ArtistProfile.module.css";

const ArtistProfile = ({ artist }) => {
  if (!artist) {
    console.log("⛔ Aucun artiste reçu !");
    return <div>Chargement de l’artiste...</div>;
  }

  console.log("✅ Images de l'artiste :", artist.artistImages);

  return (
    <div className={styles.ArtistProfile}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoColumns}>
          <div className={styles.infoColumnLeft}>
            <div className={styles.artistDetails}>
              <p>Pays : France</p>
              <p>Ville : Colombes</p>
              <p>Née en : 1964</p>
              <p>
                Supports et techniques : Encre et acrylique sur toile et
                impression Sérigraphie sur papier
              </p>
            </div>
            <button className={styles.followButton} role="button" tabIndex={0}>
              <span className={styles.buttonText}>SUIVRE CET ARTISTE</span>
            </button>
          </div>

          <div className={styles.infoColumnRight}>
            <div className={styles.artistBio}>
              <p className={styles.bioText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p className={styles.spacer}></p>
              <p className={styles.expo}>PARCOURS & EXPOSITIONS</p><br />
              <p className={styles.expo}>2020 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2019 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2019 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2019 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2018 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2017 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2017 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2016 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2016 : salon d'art contemporain, Colombes</p>
              <p className={styles.expo}>2016 : salon d'art contemporain, Colombes</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.imageFullWidth}>
        {artist?.artistImages?.[2] ? (
          <Image
            src={artist.artistImages[2].url}
            alt={artist.artistImages[2].altText || `Portrait de ${artist.username}`}
            width={1000}
            height={700}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            
          />
        ) : (
          <Image
            src="/placeholder.jpg"
            alt="Image par défaut"
            width={800}
            height={800}
          />
        )}
      </div>

      <div className={styles.interviewSection}>
        <div className={styles.interviewLabel}>INTERVIEW</div>
        <h2 className={styles.interviewTitle}>RENCONTRE AVEC {artist?.username || "Nom inconnu"}</h2>

        <div className={styles.interviewContent}>
          <div>
            <p className={styles.question}>Comment êtes-vous devenue artiste ?</p>
            <p className={styles.answer}>
              Ma passion pour le dessin et l'illustration est venue en regardant
              peindre le père de ma meilleure amie Pierre Fonferrier, illustrateur
              et peintre réaliste des années 1990. [...]
            </p>
          </div>

          <div>
            <p className={styles.question}>Comment définiriez-vous votre univers ?</p>
            <p className={styles.answer}>
              Mon univers se situe entre le dessin et la peinture, fortement
              inspiré par les cadrages photographiques.
            </p>
          </div>

          <div>
            <p className={styles.question}>
              Quel artiste (mort ou vivant) aimeriez-vous rencontrer ?
            </p>
            <p className={styles.answer}>
              David Hockney, Velasquez et Henry Cartier Bresson.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
