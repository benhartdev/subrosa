"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./Gallery.module.css";

export default function Gallery({ items = [], loading, customClass = "", customCardClass = "", fieldsToShow = [], type }) {
  const pathname = usePathname();

  if (loading) return <LoadingSkeleton />;

  return (
    <div className={styles.artistGallery}>
      <div className={styles.galleryContainer}>
        <div className={`${customClass || styles.artistGalleryGrid}`}>

          {items.map((item, index) => {
            const linkHref =
              type === "artist"
                ? `/artistes/${item.slug}`
                : type === "works"
                ? `/oeuvres/${item.slug || item.Slug || item._id}`
                : null;

            const imageUrl = item.image || item.images?.[0]?.url || "/placeholder.jpg";
            const altText = item.title || item.name || "Image";

            const content = (
              <div className={styles.artistGalleryItem}>
                <div className={`${styles.artworkCard} ${customCardClass}`}>
                  <div className={styles.artworkImageBox}>
                    <img
                      src={imageUrl}
                      alt={altText}
                      className={`${styles.artistGalleryImage} ${styles.artworkHover}`}
                    />
                  </div>
                </div>
                <div className={styles.artworkInfo}>
                  {fieldsToShow.includes("title") && (
                    <h3 className={styles.artworkTitle}>{item.title || item.name || "Titre"}</h3>
                  )}

                  {pathname !== "/" && (
                    <div className={`${styles.artworkDivider} ${styles.dividerDefault}`} />
                  )}

                  {fieldsToShow.includes("description") && item.description && (
                    <p className={styles.artworkDescription}>{item.description}</p>
                  )}
                  {fieldsToShow.includes("medium") && item.medium && (
                    <p className={styles.artworkMedium}>{item.medium}</p>
                  )}
                  {fieldsToShow.includes("dimensions") && item.dimensions && (
                    <p className={styles.artworkDimensions}>
                      {item.dimensions.height} × {item.dimensions.width}
                      {item.dimensions.depth ? ` × ${item.dimensions.depth}` : ""}
                      {item.dimensions.unit ? ` ${item.dimensions.unit}` : " cm"}
                    </p>
                  )}
                  {fieldsToShow.includes("themes") && item.themes?.length > 0 && (
                    <p className={styles.artworkThemes}>Thèmes : {item.themes.join(", ")}</p>
                  )}
                  {fieldsToShow.includes("type") && item.type && (
                    <p className={styles.artworkType}>{item.type}</p>
                  )}
                  {fieldsToShow.includes("artistName") && item.artistName && (
                    <p className={styles.artworkArtist}>{item.artistName}</p>
                  )}
                  {fieldsToShow.includes("price") && item.price && (
                    <p className={styles.artworkPrice}>{item.price} €</p>
                  )}
                  {fieldsToShow.includes("username") && item.username && (
                    <p className={styles.artworkUsername}>{item.username}</p>
                  )}

                  {pathname === "/" &&
                    fieldsToShow.includes("username") &&
                    fieldsToShow.includes("style") && (
                      <div className={`${styles.artworkDivider} ${styles.dividerHome}`} />
                    )}

                  {fieldsToShow.includes("style") && item.style && (
                    <p className={styles.artworkStyle}>{item.style}</p>
                  )}
                  {fieldsToShow.includes("date") && item.date && (
                    <p className={styles.artworkDate}>
                      Ajouté le{" "}
                      {new Date(item.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
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
    </div>
  );
}
