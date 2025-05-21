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
    return <p style={{ color: "white", padding: "2rem" }}>⛔ Accès réservé aux artistes connectés.</p>;
  }

  return (
    <main>
      <h1 className={styles.dashboardTitle}>{user.username}</h1>

      <Link href="/ajout-oeuvre" className={styles.addArtworkButton}>
      <Image src="/images/logo_oeuvre_1.svg"
          alt="Icône ajouter œuvre"
          width={120}
          height={120}
          className={styles.artIcon}/>
      Ajouter une œuvre
    </Link>

      {user.status === "pending" && (
        <PendingStatusBanner username={user.username} />
      )}
      <section style={{ marginTop: "4rem" }}>
      <ArtistDashboardWorks />
      </section>
      <section style={{ marginTop: "2rem" }}>
       
        <ul className={styles.viewProfile}>
          <li><Link href={`/artiste/${user._id}`}>👤 Voir mon profil public</Link></li>
        </ul>
      </section>
    </main>
  );
};

export default ArtistDashboard;
