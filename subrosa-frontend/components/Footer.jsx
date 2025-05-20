"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import Newsletter from "./Newsletter";

const Footer = () => {

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
          <Newsletter />

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
