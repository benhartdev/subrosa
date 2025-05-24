// ✅ components/admin/GestionUtilisateurs.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GestionUtilisateurs() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("Utilisateurs:", res.data);
        setUsers(res.data);
      })
      .catch(err => console.error("Erreur chargement utilisateurs:", err));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>👥 Liste des utilisateurs</h2>
      {users.length === 0 && <p>Aucun utilisateur</p>}
      {users.map(user => (
        <div key={user._id} style={{ border: "1px solid white", padding: "1rem", marginBottom: "1rem" }}>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.newsletterSubscribed}</p>
          
          
          <button>Supprimer</button>
        </div>
      ))}
    </div>
  );
}