"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsChart from "../../components/admin/StatsChart";

export default function AdminStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          withCredentials: true,
        });
        console.log("🧪 Données stats reçues :", res.data); // 👈 ici
        setStats(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des stats :", err);
      }
    }

    fetchStats();
  }, []);

  if (!stats) return <p>Chargement des statistiques...</p>;

  return (
    <section className="admin-stats">
     
      <ul className="admin-list">
      {stats && <StatsChart stats={stats} />}
        <li>👩‍🎨 Artistes total : {stats.totalArtists}</li>
        <li>✅ Artistes validés : {stats.approvedArtists}</li>
        <li>🕐 En attente : {stats.pendingArtists}</li>
        <li>👥 Utilisateurs : {stats.totalUsers}</li>
        <li>🎨 Œuvres : {stats.totalWorks}</li>
        <li>🧾 Commandes : {stats.totalOrders}</li>
      </ul>
    </section>
  );
}
