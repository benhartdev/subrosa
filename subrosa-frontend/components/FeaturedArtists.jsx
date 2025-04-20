// components/FeaturedArtists.jsx
'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/featuredArtists.css";

export default function FeaturedArtists({ specificIds = [] }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      let url = `${baseUrl}/artists/featured`;
      if (specificIds.length > 0) {
        url += `?ids=${specificIds.join(",")}`;
      }
      try {
        const res = await fetch(url);
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error("Erreur lors du fetch des artistes en vedette :", error);
      }
    }
    fetchArtists();
  }, []);

  return (
    <div className="featured-artists">
      {artists.map((artist) => (
        <div key={artist._id} className="featured-artist-card">
          {artist.images && artist.images.length > 0 && (
            <Image
              src={artist.images[0].url}
              alt={artist.name}
              width={300}
              height={300}
              className="featured-artist-image"
            />
          )}
          <p className="artist-name">{artist.name}</p>
        </div>
      ))}
    </div>
  );
}
