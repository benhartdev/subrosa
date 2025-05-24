"use client";

import ValidationArtistes from "./ValidationArtistes";
import GestionOeuvres from "./GestionOeuvres";
import GestionUtilisateurs from "./GestionUtilisateurs";
import Commandes from "./Commandes";
import StatsChart from "./StatsChart";
import { useState, forwardRef, useImperativeHandle } from "react";




const AdminDashboardTabs = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState("stats");
  
  useImperativeHandle(ref, () => ({
    openTab: (tabName) => setActiveTab(tabName),
  }));

  const tabs = {
    stats: <StatsChart stats={{
    totalArtists: 10,
      approvedArtists: 5,
      pendingArtists: 5,
       totalUsers: 1,
     totalWorks: 12,
      totalOrders: 2
    }} />,
  validation: <ValidationArtistes />,
    oeuvres: <GestionOeuvres />,
    users: <GestionUtilisateurs />,
     commandes: <Commandes />,
   };
  

  return (
    <div style={{ background: "#111", padding: "2rem", border: "1px solid white", borderRadius: "12px" }}>
      <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={() => setActiveTab("stats")}>📊 Stats</button>
        <button onClick={() => setActiveTab("validation")}>✅ Artistes</button>
        <button onClick={() => setActiveTab("oeuvres")}>🎨 Œuvres</button>
        <button onClick={() => setActiveTab("users")}>👥 Utilisateurs</button>
        <button onClick={() => setActiveTab("commandes")}>🧾 Commandes</button>
      </nav>
      

      <div>{tabs[activeTab]}</div>
    </div>
  );
});

export default AdminDashboardTabs;
