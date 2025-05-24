// components/DoubleBorderContainer.jsx
"use client";

import React from "react";
import styles from "./DoubleBorderContainer.module.css";

export default function DoubleBorderContainer({ title, children }) {
  return (
    <section className={styles.artistGallerySection}>
      <div className={styles.artistGalleryWrapper}>
        <div className={styles.artistGalleryTitleWrapper}>
          <h2 className={styles.artistGalleryTitle}>{title}</h2>
        </div>
        <div className={styles.artistGalleryInner}>
          {children}
        </div>
      </div>
    </section>
  );
}
