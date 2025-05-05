"use client"; 

import "../../styles/PersonalLogin.css"; 
import "../../styles/inscription-artiste.css";
import Header from "../../components/Header"; 
import ArtistFullForm from "../../components/ArtistFullForm"; // on importe le formulaire
import AdminStats from "../../components/admin/AdminStats";
import ArtistEditPanel from '../../components/admin/ArtistEditPanel';
import AdminPendingWorksPanel from "../../components/admin/AdminPendingWorksPanel";
import PendingArtists from "../../components/admin/PendingArtists";
import AdminDashboardTabs from "../../components/admin/AdminDashboardTabs";

import { useState } from "react"; 
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router
import { useAuth } from "../../components/context/AuthContext";


const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const dashboardRef = useRef(); // pour pouvoir lui parler depuis tes boutons

  useEffect(() => {
    console.log("🧠 Vérification user pour redirection admin :", user);
   // Redirection si user est null OU non admin
  if (user === null || !user || user.role !== "admin") {
    console.log("❌ Redirection vers /login (user invalide ou absent)", user);
    router.push("/login");
  }
}, [user, router]);

  if (!user || user.role !== "admin") {
    return <p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>Redirection en cours...</p>;
  }

  return (
    <>
      <Header />
      <main id="containerLogin" style={{ padding: "2rem", background: "#0a0a0a", color: "white" }}>
        <div id="box-component">
          <h1 id="personal-space" style={{ fontSize: "2rem", textAlign: "center" }}>ESPACE ADMINISTRATEUR</h1>
          <p id="text-login">Salut Ben H, tu as fait un site de compet, maintenant faut le gerer !!!  Au boulot</p>
          <PendingArtists />
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "2rem auto", lineHeight: "2" }}>
            <li>✅ Les artistes en attente de validation</li>
            <li>🎨 Les œuvres du catalogue</li>
            <li>👥 Les utilisateurs</li>
            <li>🧾 Les commandes</li>
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
              <ArtistFullForm />
            </div>
          )}
        </div>
        <AdminStats />
        <section style={{ marginTop: "8rem" }}></section>
        <ArtistEditPanel />
        <AdminPendingWorksPanel />
      </main>
    </>
  );
};


export default AdminPage;
