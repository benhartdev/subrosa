
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import "../styles/artistGallery.css";

export default function Gallery({ items = [], loading, customClass = "", fieldsToShow = [], type }) {
  const pathname = usePathname();

  if (loading) return <LoadingSkeleton />;
  
  return (
    <div className="artist-gallery">
      <div className="gallery-container">
      <div className={`artist-gallery-grid ${customClass}`}>
       {items.map((item, index) => {

        console.log("item.slug:", item.slug);

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
                  <img src={imageUrl} alt={altText} className="artist-gallery-image artwork-hover" />
               </div>
             </div>
            <div className="artwork-info">
  {fieldsToShow.includes("title") && (
    <h3 className="artwork-title">{item.title || item.name || "Titre"}</h3>)}
  {/* Divider entre title et les autres infos – uniquement hors accueil */}
      {pathname !== "/" && (<div className="artwork-divider divider-default" />)}
  {fieldsToShow.includes("description") && item.description && (<p className="artwork-description">{item.description}</p>)}
  {fieldsToShow.includes("medium") && item.medium && (<p className="artwork-medium">{item.medium}</p>)}
  {fieldsToShow.includes("dimensions") && item.dimensions && (<p className="artwork-dimensions">
      {item.dimensions.height} × {item.dimensions.width}
      {item.dimensions.depth ? ` × ${item.dimensions.depth}` : ""}
      {item.dimensions.unit ? ` ${item.dimensions.unit}` : " cm"}</p>)}
  {fieldsToShow.includes("themes") && item.themes?.length > 0 && (<p className="artwork-themes">Thèmes : {item.themes.join(", ")}</p>)}
  {fieldsToShow.includes("type") && item.type && (<p className="artwork-type">{item.type}</p>)}
  {fieldsToShow.includes("artistName") && item.artistName && (<p className="artwork-artist">{item.artistName}</p>)}
  {fieldsToShow.includes("price") && item.price && (<p className="artwork-price">{item.price} €</p>)}
  {fieldsToShow.includes("username") && item.username && (<p className="artwork-username">{item.username}</p>)}
   {/* Divider entre username et style uniquement sur la page d’accueil */}
        {pathname === "/" && fieldsToShow.includes("username") && fieldsToShow.includes("style") && (<div className="artwork-divider divider-home" />)}
  {fieldsToShow.includes("style") && item.style && (<p className="artwork-style">{item.style}</p>)}
  {fieldsToShow.includes("date") && item.date && (<p className="artwork-date">Ajouté le{" "}
      {new Date(item.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",})}</p>)}
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
  </div>
  );
}