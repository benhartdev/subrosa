// components/SablierLoader.jsx
"use client";
import React from "react";
import styles from "./SablierLoader.module.css";

const SablierLoader = () => {
  return (
    <div className={styles.sablierOverlay}>
      <img
        src="/images/sablier_svg_corrigé.svg"
        alt="Chargement..."
        className={styles.sablierSvg}
      />
    </div>
  );
};

export default SablierLoader;
