'use client'

import React from 'react';
import '../styles/artistCard.css';

const ArtistCard = ({ name, location, imageUrl, description }) => {
    return (
        <div className="artist-card">
            <img src={imageUrl} alt={name} className="artist-image" />
            <div className="artist-info">
            <h3>{name}</h3>
            <p>{location}</p>
            <p>{description}</p>
        </div>
    </div>
    );
};

export default ArtistCard;