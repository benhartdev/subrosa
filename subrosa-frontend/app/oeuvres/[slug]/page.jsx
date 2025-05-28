
import React from "react";
import Image from "next/image";
import styles from "./PageOeuvreUnique.module.css";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { ImYoutube } from "react-icons/im";



export default async function WorkSlugPage({ params }) {
  const slug = params.slug;
  const res = await fetch(`http://localhost:5000/api/works/slug/${slug}`, {
    cache: "no-store",
  });
  const work = await res.json();
  const artist = work.artistId;
  const currentUrl = `https://53f4-37-167-134-78.ngrok-free.app/oeuvres/${params.slug}`;


  return (
    <main>
      <h2 className={styles.artistName1}>{artist?.name || "Nom inconnu"}</h2>
      <h3 className={styles.workTitle1}>{work.title}</h3>

      <div className={styles.imageWork}>
        <Image
          src={work.images?.[0]?.url || "/placeholder.jpg"}
          alt={work.title}
          width={600}
          height={600}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          className={styles.mainArtworkImage} />
      </div>
      
      <div className={styles.artworkDetailsContainer}>
         <div className={styles.leftColumn}>
        <div className={styles.artworkInfo}>
          <div className={styles.artworkInfoP}>
            <p className={`${styles.artistName2} ${styles.high}`}>
              {artist?.name || "Nom inconnu"}
            </p>
            <p className={styles.workTitle2}>{work.title}</p>
            <p className={styles.workDate}>
              {work.creation_date ? new Date(work.creation_date).getFullYear() : "Date inconnue"}
            </p>
            <div className={styles.workMedium}>
            <p>{work.medium} <br />
              {`${work.dimensions?.width || "?"} x ${work.dimensions?.height || "?"} ${work.dimensions?.unit || "cm"}`} <br />
              œuvre originale et signée
            </p>
            </div>
          </div>
        </div>
      <div className={styles.artworkDetailsBis}>
        <div className={styles.artworkDetailsBisContainer}>
          <p className={styles.artworkDetailsBisDescription}>{work.description}</p>
          <div className={styles.artworkDetailsBisAction}>
            <button className={styles.artworkDetailsBisAskButton}>
              POSER&nbsp;UNE&nbsp;QUESTION&nbsp;À&nbsp;L'ARTISTE
            </button>
          </div>
          <p className={styles.artworkDetailsBisShareTitle}>PARTAGER SUR</p>
          <div className={styles.artworkDetailsBisSocialLinks}>
          
              <a href={`https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <FaInstagram /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare /></a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <BsTwitterX /></a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
              <FaLinkedin /></a>
              <a href={`https://www.youtube.com/`}target="_blank" rel="noopener noreferrer">
              <ImYoutube /></a>

          </div>
        </div>
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
            {/* A VENIR: Wishlist feature
            <button className={styles.wishlistButton}>
              <span className={styles.wishlistText}>Ajouter à ma Wishlist</span>
            </button> */}
          </div>
        </div>
      </div>

  {Array.isArray(work.images) && work.images.length > 1 && (
  <section className={styles.artworkSection}>
    <div className={styles.contentContainer}>
      <h3 className={styles.sectionTitle}>LES DETAILS DE L'ŒUVRE</h3>
       <div className={styles.imageGrid}>
        {work.images.slice(1).map((img, index) => (
          <figure className={styles.imageWrapper} key={index}>
            <Image
              src={img.url.startsWith("http") ? img.url : `http://localhost:5000${img.url}`}
              alt={img.altText || `Zoom ${index + 1}`}
              width={400}
              height={400}
              className={styles.artworkImage}
            />
          </figure>
        ))}
      </div>
    </div>
  </section>
)}
    <hr className={styles.customSaparator1} />
      <section className={styles.artistProfileContentColumn}>
  <div className={styles.artistProfileContentWrapper}>
    <span className={styles.artistProfileLabel}>RENCONTRE AVEC L'ARTISTE</span>
    <h2 className={styles.artistProfileName}>{artist?.name || work.artistName}</h2>
    <div className={styles.artistProfileBody}>
      {/* Image à gauche */}
      <div className={styles.artistProfilePhotoWrapper}>
        <Image
          src={artist?.artistImages?.[0]?.url || "/placeholder.jpg"}
          alt={artist?.artistImages?.[0]?.altText || `Portrait de ${artist?.username}`}
          fill
          className={styles.artistProfileImage}
        />
      </div>
      {/* Texte à droite */}
      <div className={styles.artistProfileText}>
        <section className={styles.artistInterview}>
            <p className={styles.question1Title}>Comment êtes-vous devenu artiste ?</p>
            <p className={styles.answer1Title}>{artist.interview?.question1}</p>
            <p className={styles.question2Title}>Comment définiriez-vous votre univers ?</p>
            <p className={styles.answer2Title}>{artist.interview?.question2}</p>
            <p className={styles.question3Title}>Quel artiste (mort ou vivant) aimeriez-vous rencontrer ?</p>
            <p className={styles.answer3Title}>{artist.interview?.question3}</p>
      </section>
        <button className={styles.interviewButton}>
          VOIR L'INTERVIEW COMPLÈTE DE L'ARTISTE
        </button>
        {/* FEAT A VENIR */}
        {/* <button className={styles.followButton}>
          SUIVRE L'ARTISTE
        </button> */}
      </div>
    </div>
  </div>
</section>
  <hr className={styles.customSaparator2} />
    </main>
  );
}
