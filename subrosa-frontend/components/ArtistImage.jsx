"use client";

import React from "react";
import "../styles/artistGallery.css";

const ArtistImage = ({ src, alt }) => {
  return (
    <img src={src} alt={alt}/>
  );
};

export default ArtistImage;
