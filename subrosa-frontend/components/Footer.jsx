"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  useEffect(() => {
    const emailInput = document.querySelector(`.${styles["email"]}`);
    const submitBtn = document.querySelector(`.${styles["subscribe-btn"]}`);

    const handleSubscribe = async () => {
      const email = emailInput.value.trim();
      if (!email) return window.showGlobalPopup?.("Veuillez entrer un email.", true);

      try {
        const res = await fetch("http://localhost:5000/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          window.showGlobalPopup?.(data.message || "Inscription Newsletter réussie.");
          emailInput.value = '';
        } else {
          window.showGlobalPopup?.(data.message || "Erreur lors de l'inscription.", true);
        }
      } catch (err) {
        console.error("Erreur newsletter :", err);
        window.showGlobalPopup?.("Erreur réseau ou serveur.", true);
      }
    };

    if (submitBtn) submitBtn.addEventListener("click", handleSubscribe);
    return () => {
      if (submitBtn) submitBtn.removeEventListener("click", handleSubscribe);
    };
  }, []);

  return (
    <footer className={styles["footer"]}>
      <section className={styles["info-banner-clean"]}>
        <div className={styles["info-banner_container"]}>
          <article className={styles["info-banner_item"]}>LIVRAISON PREMIUM ET ASSURÉE</article>
          <article className={styles["info-banner_item"]}>TARIFS NÉGOCIÉS</article>
          <article className={styles["info-banner_item"]}>PAIEMENTS SÉCURISÉS</article>
          <article className={styles["info-banner_item"]}>ŒUVRE A L’ESSAI Retour gratuit sous 15 jours</article>
        </div>
      </section>

      <section className={styles["footer-wrapper"]}>
        <div className={styles["footer-flex-wrapper"]}>
          <div id="newsletter" className={styles["newsletter-container"]}>
            <label className={styles["newsletter-label"]} htmlFor="email">INSCRIPTION NEWSLETTER</label>
            <div className={styles["newsletter"]}>
              <input type="email" className={styles["email"]} placeholder="votre adresse mail" />
              <button className={styles["subscribe-btn"]}>OK</button>
            </div>
          </div>

          <nav className={styles["footer-links"]}>
            <div className={styles["footer-column"]}>
              <p className={styles["footer-text"]}>NOTRE CATALOGUE</p>
              <Link href="/page-gallerie?type=works" className={styles["footer-link"]}>LES OEUVRES</Link>
              <Link href="/page-gallerie?type=artist" className={styles["footer-link"]}>NOS ARTISTES</Link>
            </div>
            <div className={styles["footer-column"]}>
              <p className={styles["footer-text"]}>NOTRE GALERIE</p>
              <Link href="/about" className={styles["footer-link"]}>QUI SOMMES NOUS</Link>
              <Link href="/page_engagement" className={styles["footer-link"]}>NOS ENGAGEMENTS</Link>
              <Link href="/contact" className={styles["footer-link"]}>CONTACTEZ NOUS</Link>
            </div>
            <div className={styles["footer-column"]}>
              <p className={styles["footer-text"]}>NOTRE COMMUNAUTÉ</p>
              <Link href="/blog" className={styles["footer-link"]}>MAGAZINE “SUB ROSA ART”</Link>
              <Link href="#" className={styles["footer-link"]}>ARTISTE EN ENTREPRISE</Link>
            </div>
          </nav>
        </div>
      </section>

      <div className={styles["footer-border_5"]}></div>

      <div className={styles["footer-links_2"]}>
        <nav className={styles["legal-links"]}>
          <Link href="/page_CGV" className={styles["legal-link"]}>Conditions générales de vente</Link>
          <Link href="/page_defiscalisation" className={styles["legal-link"]}>Défiscalisation / Leasing</Link>
          <Link href="#" className={styles["legal-link"]}>Confidentialité</Link>
          <Link href="#" className={styles["legal-link"]}>Mentions légales</Link>
        </nav>
      </div>

      <p className={styles["copyright"]}>&copy; 2025 SUB ROSA ART. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
