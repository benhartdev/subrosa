// components/DoubleBorderContainer.jsx
"use client";

import React from "react";
import "../styles/artistGallery.css";

export default function DoubleBorderContainer({ title, children }) {
  return (
    <section className="artist-gallery-section">
      <div className="artist-gallery-wrapper">
        <div className="artist-gallery-title-wrapper">
          <h2 className="artist-gallery-title">{title}</h2>
        </div>
        <div className="artist-gallery-inner">
          {children}
        </div>
      </div>
    </section>
  );
}
