"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import Newsletter from "./Newsletter";

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <section className={styles.infoBannerClean}>
        <div className={styles.infoBannerContainer}>
          <article className={styles.infoBannerItem}>LIVRAISON PREMIUM ET ASSURÉE</article>
          <article className={styles.infoBannerItem}>TARIFS NÉGOCIÉS</article>
          <article className={styles.infoBannerItem}>PAIEMENTS SÉCURISÉS</article>
          <article className={styles.infoBannerItem}>ŒUVRE A L’ESSAI Retour gratuit sous 15 jours</article>
        </div>
      </section>

      <section className={styles.footerWrapper}>
        <div className={styles.footerFlexWrapper}>
          <Newsletter />

          <nav className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <p className={styles.footerText}>NOTRE CATALOGUE</p>
              <Link href="/page-gallerie?type=works" className={styles.footerLink}>LES OEUVRES</Link>
              <Link href="/page-gallerie?type=artist" className={styles.footerLink}>NOS ARTISTES</Link>
            </div>
            <div className={styles.footerColumn}>
              <p className={styles.footerText}>NOTRE GALERIE</p>
              <Link href="/about" className={styles.footerLink}>QUI SOMMES NOUS</Link>
              <Link href="/page_engagement" className={styles.footerLink}>NOS ENGAGEMENTS</Link>
              <Link href="/contact" className={styles.footerLink}>CONTACTEZ NOUS</Link>
            </div>
            <div className={styles.footerColumn}>
              <p className={styles.footerText}>NOTRE COMMUNAUTÉ</p>
              <Link href="/blog" className={styles.footerLink}>MAGAZINE “SUB ROSA ART”</Link>
              <Link href="#" className={styles.footerLink}>ARTISTE EN ENTREPRISE</Link>
            </div>
          </nav>
        </div>
      </section>

      <div className={styles.footerBorder5}></div>

      <div className={styles.footerLinks2}>
        <nav className={styles.legalLinks}>
          <Link href="/cgv" className={styles.legalLink}>Conditions générales de vente</Link>
          <Link href="/defiscalisation" className={styles.legalLink}>Défiscalisation / Leasing</Link>
          <Link href="#" className={styles.legalLink}>Confidentialité</Link>
          <Link href="#" className={styles.legalLink}>Mentions légales</Link>
        </nav>
      </div>

      <p className={styles.copyright}>&copy; 2025 SUB ROSA ART. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
