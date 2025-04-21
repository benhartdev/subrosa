// components/RandomGallery.jsx
import React, { useEffect, useState } from 'react';
import './randomGallery.css';

const RandomGallery = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/works/random');
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error('Erreur de chargement des oeuvres aléatoires :', error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div className="random-gallery-wrapper">
      <h3 className="random-gallery-title">NOTRE SÉLECTION DU MOMENT</h3>
      <div className="random-gallery-grid">
        {works.map((work) => (
          <div className="gallery-item" key={work._id}>
            <img src={`http://localhost:5000/${work.images[0]?.url}`} alt={work.images[0]?.altText || 'Oeuvre'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomGallery;
