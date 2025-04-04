"use client";

import React from 'react';
import ArtistForm from '../../components/ArtistForm';
import '../../styles/inscription-artiste.css';
import Header from '../../components/Header';
import UploadImages from '../../components/UploadImages';


const InscriptionArtistePage = () => {
  return (
    <div>
      <h1>Inscription Artiste</h1>
      <Header />
      <ArtistForm />
      <UploadImages />
    </div>
  );
};

export default InscriptionArtistePage;
