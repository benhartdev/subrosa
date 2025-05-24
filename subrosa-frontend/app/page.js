// src/app/page.js

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Page.module.css';
import Gallery from "../components/Gallery";
import { useGalleryData } from "../hooks/useGalleryData";
import TestimonialSection from '../components/TestimonialSection';
import DoubleBorderContainer from "../components/DoubleBorderContainer";
import MainContent from '../components/MainContent.jsx';
import Newsletter from "../components/Newsletter";
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
            <div className={styles.headContainer}>
              <Image
                src="/images/FOND.jpg"
                alt="Image de fond"
                width={1920}
                height={1080}
                className={styles.headImage}
              />
              <div className={styles.headOverlayContent}>
                <div className={styles.logoContainer}>
                  <Link href="/">
                    <Image
                      src="/images/gallerie_SUB_logo2.png"
                      alt="Logo SUB ROSA"
                      width={500}
                      height={500}
                    />
                 </Link>
               </div>
                  <p className={styles.texteSuperpose}>Nos artistes vous ouvrent leur univers...</p>
                  <Link href="/page-gallerie?type=artist">
                    <button className={styles.discoverArtist}>Découvrez nos artistes</button>
                  </Link>
             </div>
           </div>
            <div className={styles.galleryHeader}>
              <div className={styles.galleryContent}>
                <h1 className={styles.galleryTitle}>
                  <span className={styles.galleryName}>GALLERIE</span>
                  <span className={styles.gallerySeparator}></span>
                  <span className={styles.galleryBrand}>SUB ROSA ART</span>
                </h1>
                <p className={styles.gallerySubtitle}>gallerie d’art contemporain</p>
              </div>
            </div>


            <div className={styles.navigationFilters}>
                 <Newsletter />
                <section className={styles.categoryFilters}>
                    <Link href="/page-gallerie?type=works"><button className={styles.categoryButton}>TOUTES LES OEUVRES</button></Link>
                    <Link href="/page-gallerie?type=nouveaute"><button className={styles.categoryButton}>NOUVEAUTES</button></Link>
                    <Link href="/page-gallerie?type=photographie"><button className={styles.categoryButton}>PHOTOGRAPHIES</button></Link>
                    <Link href="/page-gallerie?type=peinture"><button className={styles.categoryButton}>PEINTURES</button></Link>
                    <Link href="/page-gallerie?type=sculpture"><button className={styles.categoryButton}>SCULPTURES</button></Link>
                    <Link href="/page-gallerie?type=edition_art"><button className={styles.categoryButton}>EDITION D_ART</button></Link>
                </section>
                <p className={styles.surpriseText}>ou<br />SURPENEZ-MOI</p>
            </div>
              <section>
                          <MomentSelection />
             </section>
              {/* Section Artistes à la une */}
      <section className="accueil-artistes-a-la-une">
        <h3 className={styles.titleArtistSelection}>NOS ARTISTES COUP DE CŒUR</h3>
        <h4 className={styles.titleArtistUniverse}>Partagez leur univers…</h4>
        <Gallery
            items={featuredArtists}
            loading={loading}
            type="artist"
            customClass={styles.homeGalleryGrid}
            customCardClass={styles.homeCard}
            fieldsToShow={["name", "style", "username"]}
        />
        <div className={styles.artistsButtonContainer}>
          <Link href="/page-gallerie?type=artist">
            <button className={styles.viewAllBtn}>VOIR TOUS NOS ARTISTES</button>
          </Link>
        </div>
      </section>
        <section className={styles.blogSubrosa}>
             <DoubleBorderContainer title="SubRosa Blog">
                 <MainContent limit={2} />
            </DoubleBorderContainer>
       </section>
            <section className={styles.conceptSection}>
                <div className={styles.conceptContent}>
                    <h2 className={styles.conceptTitle}>NOTRE CONCEPT</h2>
                    <h3 className={styles.conceptHeading}>UNE NOUVELLE VISION DE L’ART CONTEMPORAIN</h3>
                    <p className={styles.conceptSubtitle}>Dissimulé sous la rose...</p>
                    <p className={styles.conceptDescription}>Mis en valeur par des artistes, pour des artistes</p>
                    <Link href="/concept">
                        <button className={styles.learnMoreBtn}>EN SAVOIR PLUS</button>
                    </Link>
                </div>
            </section>
             <section>
                <TestimonialSection />
             </section>
        </div>
    );
};

export default HomePage;

