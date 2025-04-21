// src/app/page.js

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/style_acceuil.css';
import '../styles/header.css'; // chargé une fois pour toutes

import FeaturedArtists from '../components/FeaturedArtists';
import Header from '../components/Header';
import Footer from '../components/Footer';


const HomePage = () => {
    return (
        <div>
            <Header />

            <div className="head-container">
                <Image src="/images/ben-H.ben-H.BENH3507---Mod-4---Mod.jpg" alt="Image de fond" width={1920} height={1080} />
                <h2 className="texte-superpose">Nos artistes vous ouvrent leur univers...</h2>
                <Link href="/nos_artistes">
                    <button className="discover-artist">Decouvrez nos artistes</button>
                </Link>
            </div>

            <div className="gallery-header">
                <div className="gallery-content">
                    <h3 className="gallery-title">
                        <span className="gallery-name">GALLERIE</span>
                        <span className="gallery-separator"></span>
                        <span className="gallery-brand">SUB ROSA ART</span>
                    </h3>
                    <p className="gallery-subtitle">gallerie d’art contemporain</p>
                </div>
            </div>

            <div className="navigation-filters">
                <button className="newsletter-button">
                    <span className="newsletter-button__text">INSCRIPTION NEWSLETTER</span>
                </button>
                <section className="category-filters">
                    <Link href="/nos_oeuvres"><button className="category-button">TOUTES LES OEUVRES</button></Link>
                    <Link href="/nouveautes"><button className="category-button">NOUVEAUTES</button></Link>
                    <Link href="/photography"><button className="category-button">PHOTOGRAPHIES</button></Link>
                    <Link href="/peintures"><button className="category-button">PEINTURES</button></Link>
                    <Link href="/sculptures"><button className="category-button">SCULPTURES</button></Link>
                    <Link href="/edition_art"><button className="category-button">EDITION D_ART</button></Link>
                </section>
                <p className="surprise-text">ou<br />SURPENEZ-MOI</p>
            </div>
                < FeaturedArtists />
            {/* <section className="artist-container">
                <ArtistsGallery /> 
                <div className="artists-button-container">
                    <Link href="/nos_artistes">
                        <button className="view-all-btn">VOIR TOUS NOS ARTISTES</button>
                    </Link>
                </div>
            </section> */}

            <section className="concept-section">
                <div className="concept-content">
                    <h2 className="concept-title">NOTRE CONCEPT</h2>
                    <h3 className="concept-heading">UNE NOUVELLE VISION DE L’ART CONTEMPORAIN</h3>
                    <p className="concept-subtitle">Dissimulé sous la rose...</p>
                    <p className="concept-description">Mis en valeur par des artistes, pour des artistes</p>
                    <Link href="/concept">
                        <button className="learn-more-btn">EN SAVOIR PLUS</button>
                    </Link>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default HomePage;

