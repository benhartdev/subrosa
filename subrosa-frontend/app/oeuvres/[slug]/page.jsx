import React from "react";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "../../../styles/page_oeuvre_unique.css";

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
      <div className="image">
        <Image
          src={work.images?.[0]?.url || "/placeholder.jpg"}
          alt={work.title}
          width={1200}
          height={1200}
        />
      </div>
      <div className="artwork-details-container">
        <div className="artwork-info">
          <div className="artwork-info-p">
              <p className="artist-name high">{artist?.name || "Nom inconnu"}</p>
              <p className="work-title">{work.title}</p>
              <p className="work-date">{work.creation_date ? new Date(work.creation_date).getFullYear() : "Date inconnue"}</p>
              <p>
                {work.medium} <br />
                {`${work.dimensions?.width || "?"} x ${work.dimensions?.height || "?"} ${work.dimensions?.unit || "cm"}`} <br />
                œuvre originale et signée
              </p>
          </div>
        </div>
        <div className="purchase-section">
          <div className="purchase-container">
            <h2 className="purchase-price">{work.price} {work.currency}</h2>
            <hr className="purchase-divider" />
            <button className="purchase-button">
              MISE EN RELATION AVEC L'ARTISTE POUR ACHETER CETTE OEUVRE
            </button>
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
              <span className="wishlist-text">Ajouter à ma Wishlist</span>
            </button>
          </div>
        </div>
      </div>
      <section className="artwork-details-bis">
        <div className="artwork-details-bis_container">
          <p className="artwork-details-bis_description">{work.description}</p>
          <div className="artwork-details-bis_action">
            <button className="artwork-details-bis_ask-button">
              POSER UNE QUESTION À L'ARTISTE
            </button>
          </div>
          <p className="artwork-details-bis_share-title">PARTAGER SUR</p>
          <div className="artwork-details-bis_social-links"></div>
        </div>
      </section>
      <section className="artwork-section">
        <div className="content-container">
          <h3 className="section-title">LES CARACTÉRISTIQUES DE L'ŒUVRE</h3>
          <div className="image-grid">
            {Array.isArray(work.images) && work.images.length > 1 ? (
              work.images.slice(1).map((img, index) => (
                <figure className="image-wrapper" key={index}>
                  <Image
                    src={img.url.startsWith("http") ? img.url : `http://localhost:5000${img.url}`}
                    alt={img.altText || `Zoom ${index + 1}`}
                    width={400}
                    height={400}
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
      <section className="artist-profile-content-column">
        <div className="artist-profile-content-wrapper">
          <div className="artist-profile-header">
            <Image
              src={artist?.artistImages?.[0]?.url || "/placeholder.jpg"}
              alt={artist?.artistImages?.[0]?.altText || `Portrait de ${artist?.username}`}
              width={600}
              height={600}
            />
            <span className="artist-profile-label">RENCONTRE AVEC L'ARTISTE</span>
            <h2 className="artist-profile-name">{artist?.name || work.artistName}</h2>
            <button className="follow-button">
              <span className="follow-button-text">SUIVRE L'ARTISTE</span>
            </button>
            <p className="artist-profile-description">
              {artist?.bio || "Biographie de l'artiste non disponible."}
            </p>
          </div>
          <button className="interview-button">
            VOIR L'INTERVIEW COMPLÈTE DE L'ARTISTE
          </button>
          <hr className="artist-profile-divider" />
        </div>
      </section>
    </main>
  );
}
