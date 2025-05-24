
import React from "react";
import Image from "next/image";
import styles from "./PageOeuvreUnique.module.css";

export default async function WorkSlugPage({ params }) {
  const slug = params.slug;
  const res = await fetch(`http://localhost:5000/api/works/slug/${slug}`, {
    cache: "no-store",
  });
  const work = await res.json();
  const artist = work.artistId;

  return (
    <main>
      <h2>{artist?.name || "Nom inconnu"}</h2>
      <h3>{work.title}</h3>

      <div className={styles.image}>
        <Image
          src={work.images?.[0]?.url || "/placeholder.jpg"}
          alt={work.title}
          width={1200}
          height={1200}
        />
      </div>

      <div className={styles.artworkDetailsContainer}>
        <div className={styles.artworkInfo}>
          <div className={styles.artworkInfoP}>
            <p className={`${styles.artistName} ${styles.high}`}>
              {artist?.name || "Nom inconnu"}
            </p>
            <p className={styles.workTitle}>{work.title}</p>
            <p className={styles.workDate}>
              {work.creation_date ? new Date(work.creation_date).getFullYear() : "Date inconnue"}
            </p>
            <p>
              {work.medium} <br />
              {`${work.dimensions?.width || "?"} x ${work.dimensions?.height || "?"} ${work.dimensions?.unit || "cm"}`} <br />
              œuvre originale et signée
            </p>
          </div>
        </div>

        <div className={styles.purchaseSection}>
          <div className={styles.purchaseContainer}>
            <h2 className={styles.purchasePrice}>
              {work.price} {work.currency}
            </h2>
            <hr className={styles.purchaseDivider} />
            <button className={styles.purchaseButton}>
              MISE EN RELATION AVEC L'ARTISTE POUR ACHETER CETTE OEUVRE
            </button>
            <ul className={styles.purchaseInfo}>
              <li>Livraison offerte (zone UE + UK)</li>
              <li>Retour gratuit sous 15 jours</li>
              <li>Certificat d'authenticité</li>
              <li>Paiement sécurisé</li>
            </ul>
            <button className={styles.contactButton}>
              UNE QUESTION ? CONTACTEZ-NOUS AU 0668105251
            </button>
            <button className={styles.wishlistButton}>
              <span className={styles.wishlistText}>Ajouter à ma Wishlist</span>
            </button>
          </div>
        </div>
      </div>

      <section className={styles.artworkDetailsBis}>
        <div className={styles.artworkDetailsBisContainer}>
          <p className={styles.artworkDetailsBisDescription}>{work.description}</p>
          <div className={styles.artworkDetailsBisAction}>
            <button className={styles.artworkDetailsBisAskButton}>
              POSER UNE QUESTION À L'ARTISTE
            </button>
          </div>
          <p className={styles.artworkDetailsBisShareTitle}>PARTAGER SUR</p>
          <div className={styles.artworkDetailsBisSocialLinks}></div>
        </div>
      </section>

      <section className={styles.artworkSection}>
        <div className={styles.contentContainer}>
          <h3 className={styles.sectionTitle}>LES CARACTÉRISTIQUES DE L'ŒUVRE</h3>
          <div className={styles.imageGrid}>
            {Array.isArray(work.images) && work.images.length > 1 ? (
              work.images.slice(1).map((img, index) => (
                <figure className={styles.imageWrapper} key={index}>
                  <Image
                    src={img.url.startsWith("http") ? img.url : `http://localhost:5000${img.url}`}
                    alt={img.altText || `Zoom ${index + 1}`}
                    width={400}
                    height={400}
                    className={styles.artworkImage}
                  />
                </figure>
              ))
            ) : (
              <p>Aucun zoom disponible pour cette œuvre.</p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.artistProfileContentColumn}>
        <div className={styles.artistProfileContentWrapper}>
          <div className={styles.artistProfileHeader}>
            <Image
              src={artist?.artistImages?.[0]?.url || "/placeholder.jpg"}
              alt={artist?.artistImages?.[0]?.altText || `Portrait de ${artist?.username}`}
              width={600}
              height={600}
            />
            <span className={styles.artistProfileLabel}>RENCONTRE AVEC L'ARTISTE</span>
            <h2 className={styles.artistProfileName}>{artist?.name || work.artistName}</h2>
            <button className={styles.followButton}>
              <span className={styles.followButtonText}>SUIVRE L'ARTISTE</span>
            </button>
            <p className={styles.artistProfileDescription}>
              {artist?.bio || "Biographie de l'artiste non disponible."}
            </p>
          </div>
          <button className={styles.interviewButton}>
            VOIR L'INTERVIEW COMPLÈTE DE L'ARTISTE
          </button>
          <hr className={styles.artistProfileDivider} />
        </div>
      </section>
    </main>
  );
}
