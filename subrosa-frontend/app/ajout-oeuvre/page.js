"use client";

import AddworkForm from "../../components/AddworkForm";
import "../../styles/ajout-oeuvre.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AjouterOeuvrePage() {
  return (
    <main className="ajout-oeuvre-page">
      <Header />
      <div className="ajout-oeuvre-subrosa">
        
        <h1 className="titre-artist-form">Ajouter une œuvre</h1>
        <AddworkForm />
      </div>
      <Footer />
    </main>
  );
}

