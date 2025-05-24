"use client";
import Link from "next/link";
import styles from "./MomentSelection.module.css";

const React = require("react");
const { useState, useEffect } = React;

const SelectionDuMoment = () => {
  const [oeuvres, setOeuvres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flouActif, setFlouActif] = useState(false);

  const idsChoisis = [
    "6806b27606806385c809f0d7", // image carrée 1
    "6806b33c06806385c809f0e5", // image carrée 2
    "681615598a6240e58631bd2d", // ronde 1
    "6818d0da186214d71a1e5480", // ronde 2
    "68228f824fb0786d7a7f0c2a", // paysage 1
    "68228f824fb0786d7a7f0c2c", // paysage 2
    "68228f824fb0786d7a7f0c28", // GTA
  ];

  useEffect(() => {
    const fetchOeuvres = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/works");
        const all = await res.json();
        const filtered = idsChoisis.map(id => all.find(w => w._id === id)).filter(Boolean);
        setOeuvres(filtered);
        console.log("Œuvres chargées :", filtered);
      } catch (err) {
        console.error("Erreur chargement œuvres :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOeuvres();
  }, []);

  // 🔧 Appliquer flou navbar au hover
  const handleMouseEnter = () => setFlouActif(true);
  const handleMouseLeave = () => setFlouActif(false);

  const renderImg = (index, className) => {
    const item = oeuvres[index];
    if (!item || !item.images?.[0]) return null;

    const imageUrl = item.images[0].url.startsWith("http")
      ? item.images[0].url
      : `http://localhost:5000${item.images[0].url}`;

    return (
      <Link
        href={`/oeuvres/${item.slug}`}
        key={item._id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imageUrl}
          alt={item.images[0].altText || "Œuvre"}
          className={`${styles[className]} ${styles.artworkHover}`}
        />
      </Link>
    );
  };

  if (loading) return <p>Chargement en cours...</p>;

  return (
    // Début de la section visible à l'écran
    <section className={styles.selectionContainer}>

      {/* Titre principal centré avec déco */}
      <div className={styles.selectionTitleWrapper}>
        <span className={styles.selectionLine} />
        <h2 className={styles.selectionTitle}>NOTRE SELECTION DU MOMENT</h2>
        <span className={styles.selectionLine} />
      </div>

      {/* Grille verticale 4 lignes d’œuvres */}
      <div className={styles.galleryContainer}>

        {/* Ligne 1 : 2 œuvres carrées côte à côte */}
        <div className={styles.line}>
          {renderImg(0, "imgSquare")}
          {renderImg(1, "imgSquare")}
        </div>

        {/* Ligne 2 : 2 œuvres circulaires côte à côte */}
        <div className={styles.line}>
          {renderImg(2, "imgRound")}
          {renderImg(3, "imgRound")}
        </div>

        {/* Ligne 3 : 2 œuvres horizontales (paysage) côte à côte */}
        <div className={styles.lineLandscape}>
          {renderImg(4, "imgLandscape")}
          {renderImg(5, "imgLandscape")}
        </div>

        {/* Ligne 4 : 1 image unique centrée */}
        <div className={styles.line}>
          {renderImg(6, "imgGta")}
        </div>

      </div>

      <div className={styles.selectionTitleWrapper}>
        <span className={styles.endSelectionLine} />
      </div>

      <div
        className={`${styles.navBlurOverlay} ${flouActif ? styles.navBlurOverlayActive : ""}`}
      ></div>
    </section>
  );
};

module.exports = SelectionDuMoment;
