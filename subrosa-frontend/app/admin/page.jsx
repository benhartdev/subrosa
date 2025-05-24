"use client"; 



import AdminStats from "../../components/admin/AdminStats";
import ArtistEditPanel from '../../components/admin/ArtistEditPanel';
import AdminPendingWorksPanel from "../../components/admin/AdminPendingWorksPanel";
import PendingArtists from "../../components/admin/PendingArtists";
import AdminMessagesButton from "../../components/admin/AdminMessagesButton";

import styles from "./AdminPage.module.css";

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
      
      <AdminMessagesButton />
      <main className={styles.containerLogin} style={{ padding: "2rem", background: "black", color: "white" }}>
        <div className={styles.boxComponent}>
          <h1 className={styles.personalSpace} style={{ fontSize: "2rem", textAlign: "center" }}>ESPACE ADMINISTRATEUR</h1>
          <p className={styles.textLogin}>Salut Ben H, tu as fait un site de compet, maintenant faut le gerer !!!  Au boulot</p>
          <PendingArtists />
      
          {showForm && (
            <div className="admin-form-wrapper">
              
            </div>
          )}
        </div>
        <AdminStats />
        <ArtistEditPanel />
        <AdminPendingWorksPanel />
      </main>
    </>
  );
};


export default AdminPage;
