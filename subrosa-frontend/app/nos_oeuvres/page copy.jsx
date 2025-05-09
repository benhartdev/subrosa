"use client";

import React from "react";
import AllWorksGallery from "../../components/AllWorksGallery";
import "../../styles/artistGallery.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';


const WorksPage = () => {
  const [works, setWorks] = useState([]);
 
   useEffect(() => {
     fetch("http://localhost:5000/api/works") 
       .then((res) => res.json())
       .then((data) => setWorks(data))
       .catch((err) =>
         console.error("Erreur lors du chargement des œuvres :", err)
       );
   }, []);

  return (
    <main className="artist-page">
      <Header />
      
      <section className="artist-gallery-section">
        
      <div className="artist-gallery-wrapper">
  <div className="artist-gallery-title-wrapper">
    <h2 className="artist-gallery-title">Nos œuvres</h2>
  </div>
  <div className="artist-gallery-inner">
    <AllWorksGallery works={works} />
    </div>
  </div>
</section>


      <Footer />
    </main>
  );
};

export default WorksPage;
