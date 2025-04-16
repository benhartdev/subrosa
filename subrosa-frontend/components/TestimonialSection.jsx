"use client";
import React from "react";
import styles from "../styles/photography.css";

export default function TestimonialSection() {
  return (
    <div className={styles.testimonialContainer} role="complementary">
      <div
        className={styles.testimonialContent}
        role="region"
        aria-label="Testimonials"
      >
        <div className={styles.testimonialRating}>EXCELLENT</div>
        <div className={styles.ratingStars}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/a59c121020dd2cd4b5bad3cef807917de0aa222c?placeholderIfAbsent=true"
            className={styles.starIcon}
            alt="Star"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/0cf0005bc4121c2eedfde3d52aa807dc7aa527af?placeholderIfAbsent=true"
            className={styles.starIcon}
            alt="Star"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/0cf0005bc4121c2eedfde3d52aa807dc7aa527af?placeholderIfAbsent=true"
            className={styles.starIcon}
            alt="Star"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/0cf0005bc4121c2eedfde3d52aa807dc7aa527af?placeholderIfAbsent=true"
            className={styles.starIcon}
            alt="Star"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6b3112d6797947108e0e370d8b352087/a59c121020dd2cd4b5bad3cef807917de0aa222c?placeholderIfAbsent=true"
            className={styles.starIcon}
            alt="Star"
          />
        </div>
        <div className={styles.testimonialText}>
          "Galerie très pro et avec une belle sensibilité artistique, une grande
          ouverture et des artistes des plus talentueux je recommande, merci"
        </div>
        <div className={styles.testimonialDots}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={styles.dot} />
          ))}
        </div>
      </div>

      <div className={styles.servicesSection} role="list">
        <div className={styles.serviceItem} role="listitem">
          <span className={styles.serviceText}>PAIEMENT EN 3 FOIS</span>
          <span className={styles.serviceSubtext}>SANS FRAIS</span>
        </div>
        <div className={styles.serviceItem} role="listitem">
          <span className={styles.serviceText}>TARIFS NÉGOCIÉS</span>
        </div>
        <div className={styles.serviceItem} role="listitem">
          <span className={styles.serviceText}>LIVRAISON PREMIUM</span>
          <span className={styles.serviceSubtext}>ET ASSURÉE</span>
        </div>
        <div className={styles.serviceItem} role="listitem">
          <span className={styles.serviceText}>PAIEMENTS SÉCURISÉS</span>
        </div>
        <div className={styles.serviceItem} role="listitem">
          <span className={styles.serviceText}>ŒUVRE A L'ESSAI</span>
          <span className={styles.serviceSubtext}>
            Retour gratuit sous 15 jours
          </span>
        </div>
      </div>
    </div>
  );
}
