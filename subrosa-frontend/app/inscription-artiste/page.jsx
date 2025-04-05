"use client";

import React from 'react';
import ArtistFullForm from '../../components/ArtistFullForm';
import '../../styles/inscription-artiste.css';
import Header from '../../components/Header';


const InscriptionArtistePage = () => {
  return (
    <div>
      <h1>Inscription Artiste</h1>
      <Header />
      <ArtistFullForm />
      
    </div>
  );
};

export default InscriptionArtistePage;
