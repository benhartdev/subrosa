"use client"; // à garder si tu es dans /app

import Header from "../../components/Header"; // ajuste le chemin si besoin
import ArtistForm from "../../components/ArtistForm"; // on importe le formulaire
import "../../styles/PersonalLogin.css"; // on garde le style élégant
import PendingArtists from "../../components/admin/PendingArtists";
import { useState } from "react"; // manquait dans ton code !
import "../../styles/inscription-artiste.css";
import AdminStats from "../../components/admin/AdminStats";
import AdminDashboardTabs from "../../components/admin/AdminDashboardTabs";
import { useRef } from "react";

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dashboardRef = useRef(); // pour pouvoir lui parler depuis tes boutons
  return (
    <>
      <Header />

      <main id="containerLogin" style={{ padding: "2rem", background: "#0a0a0a", color: "white" }}>
        <div id="box-component">
          <h1 id="personal-space" style={{ fontSize: "2rem", textAlign: "center" }}>ESPACE ADMINISTRATEUR</h1>

          <p id="text-login">
            Salut Ben H, tu as fait un site de compet, maintenant faut le gerer !!!  Au boulot 
          </p>

          <PendingArtists />

          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "2rem auto", lineHeight: "2" }}>
            <li>✅ Les artistes en attente de validation</li>
            <li>🎨 Les œuvres du catalogue</li>
            <li>👥 Les utilisateurs</li>
            <li>🧾 cLes commandes</li>
          </ul>

          <div className="buttonGroup" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", margin: "2rem 0" }}>
          <button onClick={() => dashboardRef.current?.openTab("validation")}>✅ Valider des artistes</button>
        <button onClick={() => dashboardRef.current?.openTab("oeuvres")}>🎨 Gérer les œuvres</button>
        <button onClick={() => dashboardRef.current?.openTab("users")}>👥 Voir les utilisateurs</button>
        <button onClick={() => dashboardRef.current?.openTab("commandes")}>🧾 Historique des commandes</button>
            <button className="btn-admin" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Fermer le formulaire" : "Créer un nouvel artiste"}
            </button>
          </div>

          {showForm && (
            <div className="admin-form-wrapper">
              <ArtistForm />
            </div>
          )}
        </div>
        <AdminStats />
        <section style={{ marginTop: "5rem" }}>
    <h2 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>
      🧠 Dashboard interactif
    </h2>
    <AdminDashboardTabs ref={dashboardRef} />
  </section>
      </main>
    </>
  );
};


export default AdminPage;
