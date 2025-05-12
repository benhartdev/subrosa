"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSkeleton from "./LoadingSkeleton";
import "../styles/artistGallery.css";

export default function Gallery({
  items = [],
  loading,
  customClass = "",
  fieldsToShow = [],
  type,
  randomEndpoint = null, // ⬅️ Si défini, on charge dynamiquement
  title = "Nos œuvres",
}) {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const fetchRandom = async () => {
      if (!randomEndpoint) return;
      try {
        const response = await fetch(randomEndpoint);
        const data = await response.json();
        setRandomItems(data);
      } catch (error) {
        console.error("Erreur chargement aléatoire :", error);
      }
    };
    fetchRandom();
  }, [randomEndpoint]);

  const dataToDisplay = randomEndpoint ? randomItems : items;

  if (loading) return <LoadingSkeleton />;

  return (
    <section className="artist-gallery-section">
      <div className="artist-gallery-wrapper">
        <div className="artist-gallery-title-wrapper">
          <h2 className="artist-gallery-title" style={{ fontSize: "2rem" }}>
            {title}
          </h2>
        </div>
      </div>

      <div className={`artist-gallery-grid ${customClass}`}>
        {dataToDisplay.map((item, index) => {
          const linkHref =
            type === "artist"
              ? `/artistes/${item.slug}`
              : type === "works"
              ? `/works/${item.slug || item.Slug || item._id}`
              : null;

          const imageUrl = item.image || item.images?.[0]?.url || "/placeholder.jpg";
          const altText = item.images?.[0]?.altText || item.title || item.name || "Image";

          const content = (
            <div className="artist-gallery-item" key={item._id || index}>
              <div className="artwork-card">
                <div className="artwork-image-box">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    width={800}
                    height={800}
                    layout="responsive"
                    objectFit="cover"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
                <div className="artwork-info">
                  {fieldsToShow.includes("title") && (
                    <h3 className="artwork-title">{item.title || item.name || "Titre"}</h3>
                  )}
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
                    <p className="artwork-type">{item.type}</p>
                  )}
                  {fieldsToShow.includes("artistName") && item.artistName && (
                    <p className="artwork-artist">{item.artistName}</p>
                  )}
                  {fieldsToShow.includes("price") && item.price && (
                    <p className="artwork-price">{item.price} €</p>
                  )}
                  {fieldsToShow.includes("username") && item.username && (
                    <p className="artwork-username">{item.username}</p>
                  )}
                  {fieldsToShow.includes("style") && item.style && (
                    <p className="artwork-style">{item.style}</p>
                  )}
                </div>
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
    </section>
  );
}
