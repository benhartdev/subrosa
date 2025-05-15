"use client";

import AddworkForm from "../../components/AddworkForm";
import "../../styles/ajout-oeuvre.css";

export default function AjouterOeuvrePage() {
  return (
    <main className="ajout-oeuvre-page">
      <div className="ajout-oeuvre-subrosa">
        <h1 className="titre-artist-form">Ajouter une œuvre</h1>
        <AddworkForm />
      </div>
    </main>
  );
}

