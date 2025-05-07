"use client";

import React, { useEffect, useState } from "react";
import "../styles/artistGallery.css";

const AllWorksGallery = ({ works }) => {
 

  return (
    <div className="artist-gallery">
      {/* <h2 className="artist-gallery-title">Toutes les œuvres</h2> */}
      <div className="artist-gallery-grid">
        {works?.map((work) => (
          <div key={work._id} className="artist-gallery-item">
            <div className="artwork-card">
              <div className="artwork-image-box">
                {work.images?.[0]?.url && (
                  <img
                  src={`http://localhost:5000${work.images[0].url}`}
                    alt={work.images[0].altText || "Œuvre"}
                  />
                )}
                </div>
              </div>
              <div className="artwork-info">
                <h3 className="artwork-title">{work.title || "Titre inconnu"}</h3>
                <div className="artwork-divider" />
                <p className="artwork-artist">{work.artistId?.name || "Artiste inconnu"}</p>
                
                {/* <p className="artwork-medium">
                  {work.medium || works.description}</p> */}
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWorksGallery;
