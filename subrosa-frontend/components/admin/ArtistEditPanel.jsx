"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtistFullForm from "../../components/ArtistFullForm";
import "../../styles/inscription-artiste.css";

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
      await axios.delete(`http://localhost:5000/api/artists/${id}`);
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
          withCredentials: true // ✅ autorise l'envoi du cookie de session
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
    <div className="container">
      <h2 className="admin-section-title">Gestion des artistes</h2>
      {message && <p className="message-info">{message}</p>}

      <div className="artist-cards">
        {artists.map((artist) => (
          <div key={artist._id} className="card-artist">
            <h3>{artist.username}</h3>
            <p><strong>Email :</strong> {artist.email}</p>
            <p><strong>Bio :</strong> {artist.bio?.slice(0, 100)}...</p>
            <div className="buttonGroup">
              <button className="button primary" onClick={() => setEditingArtist(artist)}>✏️ Modifier</button>
              <button className="button danger" onClick={() => handleDelete(artist._id)}>🗑️ Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {editingArtist && (
        <ArtistFullForm
        existingData={editingArtist}
        onCancel={handleCancel}
        onSubmit={handleUpdate}
        mode="admin-edit"
      />
      )}
    </div>
  );
};

export default ArtistEditPanel;
