"use client";

import React, { useEffect, useState } from "react";
import "../../../styles/admin-messages.css";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => setError(err.message));
  }, []);

  const confirmDelete = (id) => {
    setSelectedMessageId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${selectedMessageId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Erreur");

      setMessages((prev) => prev.filter((msg) => msg._id !== selectedMessageId));
    } catch (err) {
      alert("Erreur lors de la suppression du message.");
    } finally {
      setShowModal(false);
      setSelectedMessageId(null);
    }
  };

  const filteredMessages = messages.filter((msg) =>
    [msg.name, msg.email].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const linkedMessages = filteredMessages.filter((msg) => msg.artistId);
  const unlinkedMessages = filteredMessages.filter((msg) => !msg.artistId);

  const renderMessage = (msg) => (
    <div key={msg._id} className="message-card">
      {msg.artistId?.artistImages?.[0]?.url && (
        <img
          src={msg.artistId.artistImages[0].url}
          alt={`Portrait de ${msg.artistId.username || "artiste"}`}
          className="artist-img"
        />
      )}

      <p><strong>Nom :</strong> {msg.name}</p>
      <p><strong>Email :</strong> {msg.email}</p>
      <p><strong>Date :</strong> {new Date(msg.createdAt).toLocaleString()}</p>
      <p><strong>Message :</strong><br />{msg.message}</p>

      <p className={`artist-status ${msg.artistId ? "linked" : "unlinked"}`}>
        {msg.artistId?.username
          ? `✅ ${msg.artistId.username}`
          : "⚠️ Message orphelin"}
      </p>

      <div className="actions">
        <a
          href={`mailto:${msg.email}?subject=Réponse à votre message reçu sur SUB ROSA`}
          className="reply-btn"
        >
          ✉️ Répondre
        </a>
        <button onClick={() => confirmDelete(msg._id)} className="delete-btn">
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <h1>📨 Tous les messages reçus</h1>

      <input
        type="text"
        placeholder="🔍 Rechercher par nom ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {error && <p className="error-message">Erreur : {error}</p>}

      <div className="columns-container">
        <div className="message-column">
          <h2 className="linked-title">📭 Messages d'artiste</h2>
          {linkedMessages.length > 0
            ? linkedMessages.map(renderMessage)
            : <p>Aucun message lié à un artiste.</p>}
        </div>

        <div className="message-column">
          <h2 className="unlinked-title">📭 Messages orphelins</h2>
          {unlinkedMessages.length > 0
            ? unlinkedMessages.map(renderMessage)
            : <p>Aucun message non lié.</p>}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>❗❗ ❗ T'ES SUR DE TOI ?❗❗❗</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)} className="cancel-btn">Annuler</button>
              <button onClick={handleConfirmDelete} className="confirm-btn">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
