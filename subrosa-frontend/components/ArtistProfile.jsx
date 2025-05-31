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
             <p><strong>Pays :</strong> {artist.country_location || "Non renseigné"}</p>
             <p><strong>Ville :</strong> {artist.city_location || "Non renseigné"}</p>
             <p><strong>Né(e) en :</strong> {artist.birthdate ? new Date(artist.birthdate).getFullYear() : "Ca ne se demande pas l'age !"}</p>
             <p><strong>Style :</strong> {artist.style || "Non renseigné"}</p>
             <p><strong>Supports et techniques :</strong> {artist.technical_skills || "Non renseigné"}</p>

            </div>
            <button className={styles.followButton} role="button" tabIndex={0}>
              <span className={styles.buttonText}>SUIVRE CET ARTISTE</span>
            </button>
          </div>

          <div className={styles.infoColumnRight}>
            <div className={styles.artistBio}>
              <p className={styles.bioText}>{artist.bio ? artist.bio.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                )) : "Biographie non disponible."}
              </p>

              <p className={styles.spacer}></p>

              <div className={styles.exposSection}>
                  <h2>Expositions passées</h2>
                  {(artist.old_exhibitions || []).map((expo, index) => (
                    <p key={index} className={styles.expo}>{expo}</p>
                  ))}
                </div>
                <div className={styles.exposSection}>
                  <h2>Expositions à venir</h2>
                  {(artist.future_exhibitions || []).map((expo, index) => (
                    <p key={index} className={styles.expo}>{expo}</p>
                  ))}
                </div>
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
        <h2 className={styles.interviewTitle}>RENCONTRE AVEC {artist?.username?.replaceAll(" ", "\u00A0") || "Nom inconnu"}</h2>

        <div className={styles.interviewContent}>
          <div>
            <p className={styles.question}>Comment êtes-vous devenue artiste&nbsp;?</p>
             <p className={styles.answer}>{artist.interview?.question1 ? artist.interview.question1.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              )) : "Réponse non renseignée."}
            </p>
          </div>

          <div>
            <p className={styles.question}>Comment définiriez-vous votre univers&nbsp;?</p>
            <p className={styles.answer}>{artist.interview?.question2 ? artist.interview.question2.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              )) : "Réponse non renseignée."}
            </p>
          </div>

          <div>
            <p className={styles.question}>
              Quel artiste (mort ou vivant) aimeriez-vous rencontrer&nbsp;?
            </p>
            <p className={styles.answer}> {artist.interview?.question3 ? artist.interview.question3.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              )) : "Réponse non renseignée."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
