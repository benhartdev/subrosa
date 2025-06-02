"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import ArtistGallery from "../components/ArtistGallery";
import styles from "./ArtistDashboardWorks.module.css"; // nouveau

const formatImageUrl = (url) => {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http") ? url : `http://localhost:5000${url}`;
};

const ArtistWorksSection = () => {
  const { user } = useAuth();
  const [validatedWorks, setValidatedWorks] = useState([]);
  const [pendingWorks, setPendingWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("🔎 USER DANS ArtistDashboardWorks :", user);
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

  if (loading) return <p style={{ color: "white" }}>Chargement des oeuvres...</p>;

  return (
    <div className={styles.artistWorksSection}>
      <h2 className={styles.dashboardSubtitle}>Oeuvres validées</h2>
      {validatedWorks.length > 0 ? (
        <ArtistGallery
          images={validatedWorks.map((w) => ({
            id: w._id,
            src: formatImageUrl(w.images?.[0]?.url),
            alt: w.images?.[0]?.altText || "Œuvre",
            title: w.title,
            date: w.createdAt,
          }))}
          fieldsToShow={["title", "date"]}
        />
      ) : (
        <p className={styles.dashboardNote}>Aucune œuvre validée pour le moment.</p>
      )}

      <h2 className={styles.dashboardSubtitle} style={{ marginTop: "4rem" }}>
    Oeuvres en attente
      </h2>
      {pendingWorks.length > 0 ? (
        <ArtistGallery
          images={pendingWorks.map((w) => ({
            id: w._id,
            src: formatImageUrl(w.images?.[0]?.url),
            alt: w.images?.[0]?.altText || "Œuvre",
            title: w.title,
            date: w.createdAt,
          }))}
          fieldsToShow={["title", "date"]}
        />
      ) : (
        <p className={styles.dashboardNote}>Aucune œuvre en attente actuellement.</p>
      )}
    </div>
  );
};

export default ArtistWorksSection;
