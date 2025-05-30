"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../components/context/AuthContext";
import PendingStatusBanner from "../../../components/PendingStatusBanner";
import ArtistDashboardWorks from "../../../components/ArtistDashboardWorks";
import styles from "./ArtistDashboardPage.module.css";



const ArtistDashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p style={{ color: "white" }}>Chargement de votre session...</p>;
  }
  if (!user || user.role !== "artist") {
    return <p style={{ color: "white", padding: "2rem", textAlign: "center" }}>⛔⛔ Accès réservé aux artistes connectés.⛔⛔</p>;
  }

  return (
    <main>
      <h1 className={styles.dashboardTitle}>{user.name}</h1>

      <Link href="/ajout-oeuvre" className={styles.addArtworkButton}>
        <div className={styles.iconAndText}>
          <Image
            src="/images/logo_oeuvre_1.svg"
            alt="Icône ajouter oeuvre"
            width={240}
            height={240}
            className={styles.artIcon}/>
          <span className={styles.addText}>Ajouter une œuvre</span>
        </div>
    </Link>

      {user.status === "pending" && (
        <PendingStatusBanner username={user.username} />
      )}
      <section style={{ marginTop: "4rem" }}>
      <ArtistDashboardWorks />
      </section>
      
    </main>
  );
};

export default ArtistDashboard;
