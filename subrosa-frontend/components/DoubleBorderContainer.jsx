// components/DoubleBorderContainer.jsx
"use client";

import React from "react";
import styles from "./DoubleBorderContainer.module.css";
import Link from "next/link";

export default function DoubleBorderContainer({ title, children, showCtaButton = false}) {
  return (
    <section className={styles.artistGallerySection}>
      <div className={styles.artistGalleryWrapper}>
        <div className={styles.artistGalleryTitleWrapper}>
          <h2 className={styles.artistGalleryTitle}>{title}</h2>
        </div>
        <div className={styles.artistGalleryInner}>
          {children}
          {showCtaButton && (
           <div className={styles.viewAllWrapper}>
        <Link href="/blog">
          <button className={styles.viewAllArticlesButton}>
            Voir tous les articles
          </button>
        </Link>
      </div>
      )}
        </div>
      </div>
      
    </section>
  );
}
