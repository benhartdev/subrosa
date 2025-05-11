// components/SablierLoader.jsx
"use client";
import React from "react";

const SablierLoader = () => {
  return (
    <div className="sablier-overlay">
      <img
        src="/images/sablier_svg_corrigé.svg"
        alt="Chargement..."
        className="sablier-svg"
      />
    </div>
  );
};

export default SablierLoader;
