"use client";

import React from "react";
import "../../styles/artistGallery.css";
import Gallery from "../../components/Gallery";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useGalleryData } from "../../hooks/useGalleryData";


const WorksPage = () => {
 const { items, loading } = useGalleryData("works");
 console.log("Œuvres récupérées :", items);
   

  return (
    <main className="artist-page">
      <Header />
      
      <section className="artist-gallery-section">
        
      <div className="artist-gallery-wrapper">
  <div className="artist-gallery-title-wrapper">
    <h2 className="artist-gallery-title">Nos œuvres</h2>
  </div>
  <div className="artist-gallery-inner">
    <Gallery items={items} loading={loading} type="works" />
    </div>
  </div>
</section>


      <Footer />
    </main>
  );
};

export default WorksPage;
