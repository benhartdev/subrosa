"use client";

import React from "react";
import "../../styles/page_oeuvre_unique.css";
import "../../styles/HeaderNew.css";
import { useGalleryData } from "../../hooks/useGalleryData";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const WorkPage = () => {
  const { items, loading } = useGalleryData("works");
const work = items.find(item => item._id === "681616de8a6240e58631bd55");

  if (loading || !work) return <p>Chargement en cours...</p>;
console.log("work.images =", work.images);
console.log("Œuvres récupérées :", items);
console.log("work = ", work);
console.log("images = ", work?.images);
  return (
    <main>
        <Header />
     
      <h1>{work.artistName}</h1>
      <h2>{work.title}</h2>

      <div className="image">
        <img src={work.image} alt={work.title} />
      </div>

      <div className="artwork-details-container">
        <div className="artwork-info">
          <p className="artwork-title">{`${work.artistName}, ${work.title}, ${work.creation_date || "Date inconnue"}`}</p>
          <p className="artwork-specs">
            {work.medium} <br />
            {`${work.dimensions?.width || "?"} x ${work.dimensions?.height || "?"} ${work.dimensions?.unit || "cm"}`} <br />
            œuvre originale et signée
          </p>
        </div>

        <div className="purchase-section">
          <div className="purchase-container">
            <h1 className="purchase-price">
              {work.price} {work.currency}
            </h1>
            <hr className="purchase-divider" />
            <button className="purchase-button">MISE EN RELATION AVEC L'ARTISTE POUR ACHETER CETTE OEUVRE</button>
            <ul className="purchase-info">
              <li>Livraison offerte (zone UE + UK)</li>
              <li>Retour gratuit sous 15 jours</li>
              <li>Certificat d'authenticité</li>
              <li>Paiement sécurisé</li>
            </ul>
            <button className="contact-button">
              UNE QUESTION ? CONTACTEZ-NOUS AU 0668105251
            </button>
            <button className="wishlist-button">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b87a0d5ebfd1a9614cff432d9c55c2d928e31358a58bf22ad34d37479b445b8?placeholderIfAbsent=true&apiKey=6b3112d6797947108e0e370d8b352087"
                alt="Wishlist icon"
                className="wishlist-icon"
              />
              <span className="wishlist-text">Ajouter à ma Wishlist</span>
            </button>
          </div>
        </div>
      </div>

      <section className="artwork-details-bis">
        <div className="artwork-details-bis_container">
          <p className="artwork-details-bis_description">
            {work.description}
          </p>
          <div className="artwork-details-bis_action">
            <button className="artwork-details-bis_ask-button">
              POSER UNE QUESTION À L'ARTISTE
            </button>
          </div>
          <p className="artwork-details-bis_share-title">PARTAGER SUR</p>
          <div className="artwork-details-bis_social-links">
            {/* Liens sociaux figés (non dynamiques) */}
          </div>
        </div>
      </section>

      <section className="artwork-section">
  <div className="content-container">
    <h3 className="section-title">LES CARACTÉRISTIQUES DE L'ŒUVRE</h3>
    <div className="image-grid">
      {Array.isArray(work.images) && work.images.length > 1 ? (
        work.images.slice(1).map((img, index) => (
          <figure className="image-wrapper" key={index}>
            <img
              src={img.url.startsWith("http") ? img.url : `http://localhost:5000${img.url}`}
              alt={img.altText || `Zoom ${index + 1}`}
              className="artwork-image"
            />
          </figure>
        ))
      ) : (
        <p>Aucun zoom disponible pour cette œuvre.</p>
      )}
    </div>
  </div>
</section>


      
      <Footer />
    </main>
  );
};

export default WorkPage;
