'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArtistSoloPage from '../../../components/ArtistSoloPage'; // chemin relatif sans @

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/artists/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArtist(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erreur récupération artiste:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!artist) return <p>Artiste introuvable</p>;

  return <ArtistSoloPage artist={artist} />;
}
