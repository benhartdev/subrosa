

'use client';

import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';
import '../styles/artistCard.css';

const ArtistsGallery = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/public/artists')
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Erreur lors du chargement des artistes :', error));
    }, []);

    return (
        <div className="artists-gallery">
            {artists.map(artist => (
                <ArtistCard 
                    key={artist._id}
                    name={artist.name}
                    location={artist.location}
                    description={artist.description}
                    imageUrl={artist.imageUrl}
                />
            ))}
        </div>
    );
};

export default ArtistsGallery;
