'use client';
import React, { useEffect, useState } from 'react';
import "../styles/artistGallery.css";
import Link from 'next/link';
import Image from 'next/image';

const RandomGallery = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/works/random');
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error('Erreur de chargement des œuvres aléatoires :', error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <section className="artist-gallery-section">
      <div className="artist-gallery-wrapper">
        <div className="artist-gallery-title-wrapper">
          <h2 className="artist-gallery-title" style={{ fontSize: '2rem' }}>
            NOTRE SÉLECTION DU MOMENT
          </h2>
        </div>
      </div>

      <div className="artist-gallery-inner">
        {works.map((work) => (
          <div className="gallery-item" key={work._id}>
            <Link href={`/works/${work.slug}`}>
              <Image
                src={work.images[0]?.url || '/placeholder.jpg'}
                alt={work.images[0]?.altText || 'Œuvre'}
                width={800}
                height={800}
                layout="responsive"
                objectFit="cover"
                
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RandomGallery;
