// ✅ components/admin/ValidationArtistes.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ValidationArtistes() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/artists?isApproved=false")
      .then(res => {
        console.log("Artistes en attente:", res.data);
        setPending(res.data);
      })
      .catch(err => console.error("Erreur chargement artistes:", err));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>✅ Artistes à valider</h2>
      {pending.length === 0 && <p>Aucun artiste en attente</p>}
      {pending.map(artist => (
        <div key={artist._id} style={{ border: "1px solid white", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>{artist.name}</strong> ({artist.username})</p>
          <button>Valider</button>
          <button>Refuser</button>
        </div>
      ))}
    </div>
  );
}