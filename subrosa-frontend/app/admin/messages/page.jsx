"use client";

import React, { useEffect, useState } from "react";
import styles from "./AdminMessages.module.css";


const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const formatUserAgent = (uaString = "") => {
  if (uaString.includes("Windows")) return "Windows";
  if (uaString.includes("Mac")) return "Mac";
  if (uaString.includes("Android")) return "Android";
  if (uaString.includes("iPhone")) return "iPhone";

  if (uaString.includes("Chrome")) return "Chrome";
  if (uaString.includes("Firefox")) return "Firefox";
  if (uaString.includes("Safari") && !uaString.includes("Chrome")) return "Safari";

  return "Inconnu";
  };

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

  const handleBlockIP = async (ip) => {
  const confirm = window.confirm(`Bloquer l’IP : ${ip} ?`);
  if (!confirm) return;

  try {
    const res = await fetch("http://localhost:5000/api/blocked-ips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    alert(`✅ IP ${ip} bloquée avec succès`);
  } catch (err) {
    alert("❌ Erreur : IP déjà bloquée ou problème serveur.");
  }
  };

  const handleUnblockIP = async (ip) => {
  try {
    const res = await fetch(`http://localhost:5000/api/blocked-ips/${ip}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    alert(`IP ${ip} débloquée`);
  } catch (err) {
    alert(`Erreur : ${err.message}`);
  }
    };

    const toggleReadStatus = async (id, currentStatus) => {
  try {
    const res = await fetch(`http://localhost:5000/api/contact/mark/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !currentStatus }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Erreur");

    // Met à jour localement
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id ? { ...msg, isRead: !currentStatus } : msg
      )
    );
  } catch (err) {
    console.error("Erreur update read status :", err);
    alert("Impossible de modifier le statut du message.");
  }
};

  const linkedMessages = filteredMessages.filter((msg) => msg.artistId);
  const unlinkedMessages = filteredMessages.filter((msg) => !msg.artistId);

  const renderMessage = (msg) => (
    <div key={msg._id} className={styles.messageCard}>
      {msg.artistId?.artistImages?.[0]?.url && (
        <img
          src={msg.artistId.artistImages[0].url}
          alt={`Portrait de ${msg.artistId.username || "artiste"}`}
          className={styles.artistImg}
        />
      )}

      <p><strong>Nom :</strong> {msg.name}</p>
      <p><strong>Email :</strong> {msg.email}</p>
      <p><strong>Date :</strong> {new Date(msg.createdAt).toLocaleString()}</p>
      <p><strong>Message :</strong><br />{msg.message}</p>
        <button
            onClick={() => toggleReadStatus(msg._id, msg.isRead)}
            className={msg.isRead ? styles.markUnreadBtn : styles.markReadBtn}>
            {msg.isRead ? "Déja LU" : "Non LU"}
        </button>
      <p className={styles.metaInfo}><strong>IP :</strong> {msg.ip || "N/A"}</p>
      <p className={styles.metaInfo}><strong>Navigateur :</strong> {formatUserAgent(msg.userAgent)}</p>
      
        <p className={`${styles.artistStatus} ${msg.artistId ? styles.linked : msg.suspectedArtistEmailMatch ? styles.suspect : styles.unlinked}`}>
         {msg.artistId?.username
        ? `✅ ${msg.artistId.username}`
        : msg.suspectedArtistEmailMatch
        ? "⚠️ Email connu d’un artiste (non loggué)"
        : "⚠️ Message orphelin"}
       </p>

      <div className={styles.actions}>
        
        <a
          href={`mailto:${msg.email}?subject=Réponse à votre message reçu sur SUB ROSA`}
          className={`${styles.adminBtn} ${styles.reply}`}>
          Répondre
        </a>
        <button onClick={() => confirmDelete(msg._id)} className={`${styles.adminBtn} ${styles.delete}`}>
          Supprimer
        </button>
          {msg.ip && (
            <div className={styles.ipActions}>
            
              <button className={`${styles.adminBtn} ${styles.block}`} onClick={() => handleBlockIP(msg.ip)}>
                🛑 Bloquer IP
              </button>
              <button className={`${styles.adminBtn} ${styles.unblock}`} onClick={() => handleUnblockIP(msg.ip)}>
                ✅ Débloquer IP
              </button>
            </div>
          )}
      </div>
    </div>
  );

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.titleMessageInbox}> Tous les messages reçus </h1>

      <input
        type="text"
        placeholder="🔍 Rechercher par nom ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {error && <p className={styles.errorMessage}>Erreur : {error}</p>}

      <div className={styles.columnsContainer}>
        <div className={styles.messageColumn}>
          <h2 className={styles.linkedTitle}>Messages d'artiste</h2>
          {linkedMessages.length > 0
            ? linkedMessages.map(renderMessage)
            : <p>Aucun message lié à un artiste.</p>}
        </div>

        <div className={styles.messageColumn}>
          <h2 className={styles.unlinkedTitle}>Messages orphelins</h2>
          {unlinkedMessages.length > 0
            ? unlinkedMessages.map(renderMessage)
            : <p>Aucun message non lié.</p>}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>❗❗ ❗ T'ES SUR DE TOI ?❗❗❗</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>Annuler</button>
              <button onClick={handleConfirmDelete} className={styles.confirmBtn}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
