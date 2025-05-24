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
        console.log("item.slug:", item.slug); // ✅ ici c’est bon !
          const linkHref =
            type === "artist"
              ? `/artistes/${item.slug}`
              : type === "works"
              ? `/oeuvres/${item.slug || item.Slug || item._id}`
              : null;
console.log("ITEM :", item);

          const imageUrl = item.image || item.images?.[0]?.url || "/placeholder.jpg";
          const altText = item.title || item.name || "Image";


          const content = (
            <div className="artist-gallery-item">
              <div className="artwork-card">
                <div className="artwork-image-box">
                  <img src={imageUrl} alt={altText} className="artist-gallery-image" />
               </div>
             </div>
            <div className="artwork-info">
              {fieldsToShow.includes("title") && <h3 className="artwork-title">{item.title || item.name || "Titre"}</h3>}
            <div className="artwork-divider" />
              {fieldsToShow.includes("description") && item.description && <p className="artwork-description">{item.description}</p>}
              {fieldsToShow.includes("medium") && item.medium && <p className="artwork-medium">{item.medium}</p>}
              {fieldsToShow.includes("dimensions") && item.dimensions && (<p className="artwork-dimensions">
                {item.dimensions.height} × {item.dimensions.width}
                {item.dimensions.depth ? ` × ${item.dimensions.depth}` : ""}
                {item.dimensions.unit ? ` ${item.dimensions.unit}` : " cm"}</p>)}
              {fieldsToShow.includes("themes") && item.themes?.length > 0 && (<p className="artwork-themes">Thèmes : {item.themes.join(", ")}</p>)}
              {fieldsToShow.includes("type") && item.type && <p className="artwork-type">{item.type}</p>}
              {fieldsToShow.includes("artistName") && item.artistName && <p className="artwork-artist">{item.artistName}</p>}
              {fieldsToShow.includes("price") && item.price && <p className="artwork-price">{item.price} €</p>}
              {fieldsToShow.includes("username") && item.username && <p className="artwork-username">{item.username}</p>}
              {fieldsToShow.includes("style") && item.style && <p className="artwork-style">{item.style}</p>}
            </div>
          </div>
          );

  return (
    <div key={item.id || index}>{linkHref ? <Link href={linkHref}>{content}</Link> : content}
    </div>
  );
})}
    </div>
  </div>
  );
}