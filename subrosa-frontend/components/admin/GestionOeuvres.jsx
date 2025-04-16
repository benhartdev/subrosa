// ✅ components/admin/GestionOeuvres.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GestionOeuvres() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/works")
      .then(res => {
        console.log("Œuvres:", res.data);
        setWorks(res.data);
      })
      .catch(err => console.error("Erreur chargement œuvres:", err));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>🎨 Gestion des œuvres</h2>
      {works.length === 0 && <p>Aucune œuvre trouvée</p>}
      {works.map(work => (
        <div key={work._id} style={{ border: "1px solid white", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>{work.title}</strong> – {work.price}€</p>
          <button>Supprimer</button>
        </div>
      ))}
    </div>
  );
}
