"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import ArtistGallery from "../components/ArtistGallery"; // tu peux réutiliser ton composant
import "../styles/ArtistDashboard.css"; // ou un CSS dédié

const ArtistWorksSection = () => {
  const { user } = useAuth();
  const [validatedWorks, setValidatedWorks] = useState([]);
  const [pendingWorks, setPendingWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.artistId) return;

    const fetchWorks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/works/all-by-artist/${user.artistId}`, {
          credentials: "include",
        });
        const allWorks = await res.json();

        const validated = allWorks.filter((w) => w.isApproved === true);
        const pending = allWorks.filter((w) => w.isApproved === false);

        setValidatedWorks(validated);
        setPendingWorks(pending);
      } catch (err) {
        console.error("Erreur chargement œuvres :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [user]);

  if (loading) return <p style={{ color: "white" }}>Chargement des œuvres...</p>;

  return (
    <div className="artist-works-section">
      <h2 className="dashboard-subtitle">🎯 Œuvres validées</h2>
      {validatedWorks.length > 0 ? (
        <ArtistGallery images={validatedWorks.map(w => ({
          src: `http://localhost:5000${w.images[0]?.url}` || "/images/placeholder.jpg",
          alt: `http://localhost:5000${w.images[0]?.altText}` || "Œuvre",
          title: w.title,
          price: w.price + " " + w.currency
        }))} />
      ) : (
        <p className="dashboard-note">Aucune œuvre validée pour le moment.</p>
      )}

      <h2 className="dashboard-subtitle" style={{ marginTop: "4rem" }}>🕓 Œuvres en attente</h2>
      {pendingWorks.length > 0 ? (
        <ArtistGallery images={pendingWorks.map(w => ({
          src: `http://localhost:5000${w.images[0]?.url}` || "/images/placeholder.jpg",
          alt: `http://localhost:5000${w.images[0]?.altText}` || "Œuvre",
          title: w.title,
          price: w.price + " " + w.currency
        }))} />
      ) : (
        <p className="dashboard-note">Aucune œuvre en attente actuellement.</p>
      )}
    </div>
  );
};

export default ArtistWorksSection;
