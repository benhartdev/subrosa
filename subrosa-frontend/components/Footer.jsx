import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Footer = () => {
    return (
        <footer>
            {/* Bannière d'informations */}
            <section className="info-banner">
                <div className="info-banner_container">
                    <article className="info-banner_item">PAIEMENT EN 3 FOIS SANS FRAIS</article>
                    <article className="info-banner_item">TARIFS NÉGOCIÉS</article>
                    <article className="info-banner_item">LIVRAISON PREMIUM ET ASSURÉE</article>
                    <article className="info-banner_item">PAIEMENTS SÉCURISÉS</article>
                    <article className="info-banner_item">ŒUVRE A L_ESSAI Retour gratuit sous 15 jours</article>
                </div>
            </section>

            {/* Logo de la galerie */}
            <Link href="/accueil">
                <Image 
                    className="footer-svg" 
                    src="/images/gallerie SUB logo.svg" 
                    alt="Icône SVG" 
                    width={200} 
                    height={100} 
                />
            </Link>

            {/* Liens du footer */}
            <section>
                <nav className="footer-links">
                    <div className="footer-column">
                        <Link href="/page_nos_oeuvres" className="footer-link">NOTRE CATALOGUE</Link>
                        <Link href="/page_nos_oeuvres" className="footer-link">LES OEUVRES</Link>
                        <Link href="/page_nos_artistes" className="footer-link">NOS ARTISTES</Link>
                    </div>
                    <div className="footer-column">
                        <Link href="#galerie" className="footer-link">NOTRE GALERIE</Link>
                        <Link href="/page_qui_sommes_nous" className="footer-link">QUI SOMMES NOUS</Link>
                        <Link href="/page_engagement" className="footer-link">NOS ENGAGEMENTS</Link>
                        <Link href="/page_contact" className="footer-link">CONTACTEZ NOUS</Link>
                    </div>
                    <div className="footer-column">
                        <Link href="#communaute" className="footer-link">NOTRE COMMUNAUTÉ</Link>
                        <Link href="#join" className="footer-link">REJOINDRE NOS ARTISTES</Link>
                        <Link href="/page_blog" className="footer-link">MAGAZINE “SUB ROSA ART”</Link>
                        <Link href="/page_artiste_entreprise" className="footer-link">ARTISTE EN ENTREPRISE</Link>
                    </div>
                </nav>
            </section>

            {/* Newsletter */}
            <div className="newsletter-container">
                <label className="newsletter-label" htmlFor="email">INSCRIPTION NEWSLETTER</label>
                <div className="newsletter">
                    <input type="email" id="email" placeholder="votre adresse mail" />
                    <button className="subscribe-btn" id="subscribe-btn">OK</button>
                </div>
            </div>

            <div className="footer-border_5"></div>

            {/* Liens légaux et réseaux sociaux */}
            <div className="footer-links_2">
                <nav className="legal-links">
                    <Link href="/page_CGV" className="legal-link">Conditions générales de vente</Link>
                    <Link href="/page_defiscalisation" className="legal-link">Défiscalisation / Leasing</Link>
                    <Link href="#" className="legal-link">Confidentialité</Link>
                    <Link href="#" className="legal-link">Mentions légales</Link>
                </nav>
            </div>

            <p>&copy; 2025 SUB ROSA ART. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;
