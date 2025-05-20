"use client";
import Link from "next/link";
import "../styles/MomentSelection.css";

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
      <Link href={`/oeuvres/${item.slug}`} key={item._id} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <img
        src={imageUrl}
        alt={item.images[0].altText || "Œuvre"}
         className={`${className} artwork-hover`}
         
      />
    </Link>
    );
  };

  if (loading) return <p>Chargement en cours...</p>;

  return (
    // Début de la section visible à l'écran
<section className="selection-container">

  {/* Titre principal centré avec déco */}
 <div className="selection-title-wrapper">
  <span className="selection-line" />
  <h2 className="selection-title">NOTRE SELECTION DU MOMENT</h2>
  <span className="selection-line" />
</div>

  {/* Grille verticale 4 lignes d’œuvres */}
  <div className="gallery-container">

    {/* Ligne 1 : 2 œuvres carrées côte à côte */}
    <div className="line">
      {renderImg(0, "img-square")}   {/* image à l’index 0 */}
      {renderImg(1, "img-square")}   {/* image à l’index 1 */}
    </div>

    {/* Ligne 2 : 2 œuvres circulaires côte à côte */}
    <div className="line">
      {renderImg(2, "img-round")}     {/* image à l’index 2 */}
      {renderImg(3, "img-round")}     {/* image à l’index 3 */}
    </div>

    {/* Ligne 3 : 2 œuvres horizontales (paysage) côte à côte */}
    <div className="line_landscape">
      {renderImg(4, "img-landscape")}  {/* image à l’index 4 */}
      {renderImg(5, "img-landscape")}  {/* image à l’index 5 */}
    </div>

    {/* Ligne 4 : 1 image unique centrée */}
    <div className="line">
      {renderImg(6, "img-gta")}       {/* image à l’index 6 */}
    </div>

   </div>
     <div className="selection-title-wrapper">
       <span className="end-selection-line" />
    </div>
   <div className={`nav-blur-overlay ${flouActif ? "active" : ""}`}></div>

</section>


  );
};

module.exports = SelectionDuMoment;