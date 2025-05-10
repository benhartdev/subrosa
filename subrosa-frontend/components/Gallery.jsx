// 1. Gallery.jsx
"use client";
import React from "react";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import "../styles/artistGallery.css";

export default function Gallery({ items = [], loading, customClass = "", fieldsToShow = [], type }) {
  if (loading) return <LoadingSkeleton />;

  return (
    <div className="artist-gallery">
      <div className={`artist-gallery-grid ${customClass}`}>
       {items.map((item, index) => {
  const linkHref =
    type === "artist"
      ? `/artistes/${item.slug}`
      : type === "works"
      ? `/oeuvres/${item._id}`
      : null;

  const content = (
    <div className="artist-gallery-item">
      <div className="artwork-card">
        <div className="artwork-image-box">
  {(item.image || item.images?.[0]?.url) && (
  <img
    src={item.image || item.images?.[0]?.url}
    alt={item.title || item.name || "Image"}
    className="artist-gallery-image"
  />
)}
</div>
      </div>
      <div className="artwork-info">
        {fieldsToShow.includes("title") && (
          <h3 className="artwork-title">{item.title || item.name || "Titre"}</h3>
        )}
        <div className="artwork-divider" />
        {fieldsToShow.includes("description") && item.description && (
          <p className="artwork-description">{item.description}</p>
        )}
        {fieldsToShow.includes("medium") && item.medium && (
          <p className="artwork-medium">{item.medium}</p>
        )}
        {fieldsToShow.includes("dimensions") && item.dimensions && (
          <p className="artwork-dimensions">
            {item.dimensions.height} × {item.dimensions.width}
            {item.dimensions.depth ? ` × ${item.dimensions.depth}` : ""}
            {item.dimensions.unit ? ` ${item.dimensions.unit}` : " cm"}
          </p>
        )}
        {fieldsToShow.includes("themes") && item.themes?.length > 0 && (
          <p className="artwork-themes">Thèmes : {item.themes.join(", ")}</p>
        )}
        {fieldsToShow.includes("type") && item.type && (
          <p className="artwork-type">Type : {item.type}</p>
        )}
        {fieldsToShow.includes("artist") && item.artistName && (
          <p className="artwork-artist">{item.artistName}</p>
        )}
        {fieldsToShow.includes("price") && item.price && (
          <p className="artwork-price">{item.price} €</p>
        )}
        {fieldsToShow.includes("username") && item.username && (
          <p className="artwork-username">Par : {item.username}</p>
        )}
      </div>
    </div>
  );

  return (
    <div key={item.id || index}>
      {linkHref ? <Link href={linkHref}>{content}</Link> : content}
    </div>
  );
})}
      </div>
    </div>
  );
}