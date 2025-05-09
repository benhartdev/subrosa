// 1. Gallery.jsx
"use client";
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import "../styles/artistGallery.css";

export default function Gallery({ items = [], type, loading, customClass = "" }) {
  if (loading) return <LoadingSkeleton type={type} />;

  return (
    <div className="artist-gallery">
      <div className={`artist-gallery-grid ${customClass}`}>
        {items.map((item, index) => (
          <div key={item.id || index} className="artist-gallery-item">
            <div className="artwork-card">
              <div className="artwork-image-box">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || item.name || "Image"}
                    className="artist-gallery-image"
                  />
                )}
              </div>
            </div>
            <div className="artwork-info">
              <h3 className="artwork-title">{item.title || item.name || "Titre"}</h3>
              <div className="artwork-divider" />

              {item.specialty && (
                <p className="artwork-skill">{item.specialty}</p>
              )}
              {item.artistName && (
                <p className="artwork-artist">{item.artistName}</p>
              )}
              {item.price && (
                <p className="artwork-medium">{item.price} €</p>
              )}
              {item.excerpt && (
                <p className="artwork-skill">{item.excerpt}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
