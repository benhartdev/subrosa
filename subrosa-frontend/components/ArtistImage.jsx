"use client";

import React from "react";
import "../styles/artistGallery.css";

const ArtistImage = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="art-image-true-ratio" />
  );
};

export default ArtistImage;
