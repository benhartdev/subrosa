"use client";

import React from 'react';
import ArtistFullForm from '../../components/ArtistFullForm';
import '../../styles/inscription-artiste.css';
import Header from '../../components/Header';


const InscriptionArtistePage = () => {
  return (
    <div>
      
      <Header />
      <ArtistFullForm />
      
    </div>
  );
};

export default InscriptionArtistePage;
