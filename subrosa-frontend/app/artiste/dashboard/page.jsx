"use client";

import { useAuth } from "../../../components/context/AuthContext";
import PendingStatusBanner from "../../../components/PendingStatusBanner";
import Link from "next/link";
import "../../../styles/ArtistDashboard.css";
import ArtistDashboardWorks from "../../../components/ArtistDashboardWorks";
import Image from "next/image";

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
      <h1>{user.username}</h1>
      <Link href="/ajout-oeuvre" className="add-artwork-button">
      <Image src="/images/logo_oeuvre_1.svg"
          alt="Icône ajouter œuvre"
          width={120}
          height={120}
          className="art-icon"/>
      Ajouter une œuvre
    </Link>

      {user.status === "pending" && (
        <PendingStatusBanner username={user.username} />
      )}
      <section style={{ marginTop: "4rem" }}>
      <ArtistDashboardWorks />
      </section>
      <section style={{ marginTop: "2rem" }}>
       
        <ul className="view-profile">
          <li><Link href={`/artiste/${user._id}`}>👤 Voir mon profil public</Link></li>
        </ul>
      </section>
    </main>
  );
};

export default ArtistDashboard;
