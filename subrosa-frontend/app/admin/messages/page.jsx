"use client";

import React, { useEffect, useState } from "react";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📨 Tous les messages reçus</h1>
      {messages.map((msg) => (
        <div
          key={msg._id}
          style={{
            border: "1px solid #444",
            padding: "1rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            backgroundColor: "#111",
          }}
        >
          {msg.artistId && msg.artistId.imageUrl1 && (
            <img
              src={msg.artistId.imageUrl1}
              alt={`Portrait de ${msg.artistId.username}`}
              style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover", marginBottom: "1rem" }}
            />
          )}

          <p><strong>Nom :</strong> {msg.name}</p>
          <p><strong>Email :</strong> {msg.email}</p>
          <p><strong>Date :</strong> {new Date(msg.createdAt).toLocaleString()}</p>
          <p><strong>Message :</strong><br />{msg.message}</p>

          <p style={{ color: msg.artistId ? "lightgreen" : "#aaa", marginTop: "0.5rem" }}>
            {msg.artistId ? `✅ Associé à : ${msg.artistId.username}` : "⚠️ Non associé à un artiste"}
          </p>

          {/* Bouton Répondre */}
          <a
            href={`mailto:${msg.email}?subject=Réponse à votre message reçu sur SUB ROSA`}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "8px 16px",
              backgroundColor: "#fff",
              color: "#000",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            ✉️ Répondre
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdminMessagesPage;
