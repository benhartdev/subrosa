"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountForm from "../../components/AccountForm";
import styles from "./ArtistEditPanel.module.css"; // ✅ module CSS

const ArtistEditPanel = () => {
  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/artists");
      setArtists(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des artistes :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet artiste ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/artists/${id}`, {
  withCredentials: true,
});
      fetchArtists();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleCancel = () => {
          setEditingArtist(null);
  };

  const handleUpdate = async (updatedArtist) => {
    try {
      await axios.put(
        `http://localhost:5000/api/artists/${updatedArtist._id}`,
        updatedArtist,
        {
          withCredentials: true
        }
      );
      setMessage("✅ Artiste mis à jour avec succès.");
      setEditingArtist(null);
      fetchArtists();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMessage("❌ Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className={styles.containerArtists}>
      <h2 className={styles.gestionArtistsTitle}>Gestion des artistes</h2>
      {message && <p className={styles.messageInfo}>{message}</p>}

      <div className={styles.artistsCards}>
        {artists.map((artist) => (
          <div key={artist._id} className={styles.soloCardArtist}>
            <h3>{artist.username}</h3>
            {artist.artistImages?.[0]?.url && (
              <img
                src={artist.artistImages?.[0]?.url}
                alt={artist.artistImages?.[0]?.altText || artist.username}
                className={styles.artistPhoto}
              />
            )}
            <p><strong>Email :</strong> {artist.email}</p>
            <div className={styles.buttonGroup}>
              <button  className={styles.buttonModify} onClick={() => setEditingArtist(artist)}>Modifier</button>
              <button className={styles.buttonSuppr} onClick={() => handleDelete(artist._id)}>Supprimer</button>
             
            </div>
          </div>
        ))}
      </div>

      {editingArtist && (
        <div className={styles.formOverlay}>
          <div className={styles.overlayForm}>
            <button type="button" className={styles.closeBtn} onClick={handleCancel}>✖</button>
            <h3 className={styles.overlayTitle}>{editingArtist.username}</h3>
            <AccountForm
              existingData={editingArtist}
              artistId={editingArtist._id}
              onCancel={handleCancel}
              onSubmit={handleUpdate}
              type="admin-edit"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistEditPanel;
