"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer children={styles["footer"]}>
            {/* Bannière d'informations */}
            <section className={styles["info-banner"]}>
                <div className={styles["info-banner_container"]}>
                    {/* <article className="info-banner_item">PAIEMENT EN 3 FOIS SANS FRAIS</article> */}
                    <article className={styles["info-banner_item"]}>TARIFS NÉGOCIÉS</article>
                    <article className={styles["info-banner_item"]}>LIVRAISON PREMIUM ET ASSURÉE</article>
                    <article className={styles["info-banner_item"]}>PAIEMENTS SÉCURISÉS</article>
                    <article className={styles["info-banner_item"]}>ŒUVRE A L’ESSAI Retour gratuit sous 15 jours</article>
                </div>
            </section>

            {/* Logo de la galerie */}
            {/* <Link href="/accueil">
                <Image 
                    className={styles["footer-svg]}" 
                    src="/images/gallerie SUB logo.svg" 
                    alt="Icône SVG" 
                    width={200} 
                    height={100} 
                />
            </Link> */}

            {/* Liens du footer */}
            <section>
                <nav className={styles["footer-links"]}>
                    <div className={styles["footer-column"]}>
                        <Link href="/page_nos_oeuvres" className={styles["footer-link"]}>NOTRE CATALOGUE</Link>
                        <Link href="/page_nos_oeuvres" className={styles["footer-link"]}>LES OEUVRES</Link>
                        <Link href="/page_nos-artistes" className={styles["footer-link"]}>NOS ARTISTES</Link>
                    </div>
                    <div className="footer-column">
                        <Link href="#galerie" className={styles["footer-link"]}>NOTRE GALERIE</Link>
                        <Link href="/page_qui_sommes_nous" className={styles["footer-link"]}>QUI SOMMES NOUS</Link>
                        <Link href="/page_engagement" className={styles["footer-link"]}>NOS ENGAGEMENTS</Link>
                        <Link href="/page_contact" className={styles["footer-link"]}>CONTACTEZ NOUS</Link>
                    </div>
                    <div className="footer-column">
                        <Link href="#communaute" className={styles["footer-link"]}>NOTRE COMMUNAUTÉ</Link>
                        <Link href="#join" className={styles["footer-link"]}>REJOINDRE NOS ARTISTES</Link>
                        <Link href="/page_blog" className={styles["footer-link"]}>MAGAZINE “SUB ROSA ART”</Link>
                        <Link href="/page_artiste_entreprise" className={styles["footer-link"]}>ARTISTE EN ENTREPRISE</Link>
                    </div>
                </nav>
            </section>

            {/* Newsletter */}
            <div className={styles["newsletter-container"]}>
                <label className={styles["newsletter-label"]} htmlFor="email">INSCRIPTION NEWSLETTER</label>
                <div className={styles["newsletter"]}>
                    <input type="email" className={styles["email"]} placeholder="votre adresse mail" />
                    <button className={styles["subscribe-btn"]}>OK</button>
                </div>
            </div>

            <div className={styles["footer-border_5"]}></div>

            {/* Liens légaux et réseaux sociaux */}
            <div className={styles["footer-links_2"]}>
                <nav className={styles["legal-links"]}>
                    <Link href="/page_CGV" className={styles["legal-link"]}>Conditions générales de vente</Link>
                    <Link href="/page_defiscalisation" className={styles["legal-link"]}>Défiscalisation / Leasing</Link>
                    <Link href="#" className={styles["legal-link"]}>Confidentialité</Link>
                    <Link href="#" className={styles["legal-link"]}>Mentions légales</Link>
                </nav>
            </div>

            <p>&copy; 2025 SUB ROSA ART. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;
