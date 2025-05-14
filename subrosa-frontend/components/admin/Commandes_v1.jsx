// ✅ components/admin/Commandes.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Commandes() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => {
        console.log("Commandes:", res.data);
        setOrders(res.data);
      })
      .catch(err => console.error("Erreur chargement commandes:", err));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>🧾 Historique des commandes</h2>
      {orders.length === 0 && <p>Aucune commande trouvée</p>}
      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid white", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Commande #{order._id.slice(-5)}</strong> – {order.totalAmount}€</p>
          <p>Client : {order.userId?.email || "Inconnu"}</p>
          <p>Status : {order.status}</p>
        </div>
      ))}
    </div>
  );
}
