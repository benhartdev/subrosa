// src/app/page.js

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/style_acceuil.css';
import Gallery from "../components/Gallery";
import { useGalleryData } from "../hooks/useGalleryData";
import TestimonialSection from '../components/TestimonialSection';
import DoubleBorderContainer from "../components/DoubleBorderContainer";
import MainContent from '../components/MainContent.jsx';
import GravityButton from "../components/Composant non utilisé/GravityButton";
const MomentSelection = require("../components/MomentSelection");

const HomePage = () => {
const { items, loading } = useGalleryData("artist");
console.log("🧩 Items (artistes) récupérés :", items);
console.log("🧪 Artistes bruts depuis useGalleryData :", items);
items.forEach((artist, i) =>
  console.log(`🔹 Artiste ${i} :`, artist?.username, "| slug :", artist?.slug)
);
const featuredArtists = [...items]
  .map((artist) => {
    const username = artist.username || "";
    const slug = artist.slug || username.toLowerCase().replace(/\s+/g, "-");
    console.log("👤 Artist:", username, "| Slug généré:", slug);

    return {...artist,slug,};
                   }).sort(() => 0.5 - Math.random())
                     .slice(0, 4);

    return (
        <div>
            <div className="head-container">
                <Image src="/images/FOND.jpg" alt="Image de fond" width={1920} height={1080} />
                <div className="gravity-logo-container">
    <GravityButton
      color="#e60073"
      icon={
        <Image
          src="/images/gallerie SUB logo2.png"
          alt="Logo SUB ROSA"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          width={500}
          height={500}
        />
      }
    />
  </div>
                <p className="texte-superpose">Nos artistes vous ouvrent leur univers...</p>
                <Link href="/page-gallerie?type=artist">
                    <button className="discover-artist">Decouvrez nos artistes</button>
                </Link>
            </div>

            <div className="gallery-header">
                <div className="gallery-content">
                    <h1 className="gallery-title">
                        <span className="gallery-name">GALLERIE</span>
                        <span className="gallery-separator"></span>
                        <span className="gallery-brand">SUB ROSA ART</span>
                    </h1>
                    <p className="gallery-subtitle">gallerie d’art contemporain</p>
                </div>
            </div>

            <div className="navigation-filters">
                <button
                    className="newsletter-button"
                    onClick={() => {
                      const section = document.getElementById("newsletter");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  ><span className="newsletter-button-text">INSCRIPTION NEWSLETTER</span>
                </button>
                <section className="category-filters">
                    <Link href="/page-gallerie?type=works"><button className="category-button">TOUTES LES OEUVRES</button></Link>
                    <Link href="/page-gallerie?type=nouveaute"><button className="category-button">NOUVEAUTES</button></Link>
                    <Link href="/page-gallerie?type=photographie"><button className="category-button">PHOTOGRAPHIES</button></Link>
                    <Link href="/page-gallerie?type=peinture"><button className="category-button">PEINTURES</button></Link>
                    <Link href="/page-gallerie?type=sculpture"><button className="category-button">SCULPTURES</button></Link>
                    <Link href="/page-gallerie?type=edition_art"><button className="category-button">EDITION D_ART</button></Link>
                </section>
                <p className="surprise-text">ou<br />SURPENEZ-MOI</p>
            </div>
              <section className="moment-selection">
                          <MomentSelection />
             </section>
              {/* Section Artistes à la une */}
      <section className="accueil-artistes-a-la-une">
        <h3 className="title-artist-selection">NOS ARTISTES COUP DE CŒUR</h3>
        <h4 className="title-artist-universe">Partagez leur univers…</h4>
        <Gallery
          items={featuredArtists}
          loading={loading}
          type="artist"
          customClass="home-gallery-grid"
          fieldsToShow={["name", "style", "username"]}
        />
        <div className="artists-button-container">
          <Link href="/page-gallerie?type=artist">
            <button className="view-all-btn">VOIR TOUS NOS ARTISTES</button>
          </Link>
        </div>
      </section>
        <section className="blog-subrosa">
             <DoubleBorderContainer title="SubRosa Blog">
                 <MainContent limit={2} />
            </DoubleBorderContainer>
       </section>
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
             <section className="testimonials-section">
                <TestimonialSection />
             </section>
        </div>
    );
};

export default HomePage;

