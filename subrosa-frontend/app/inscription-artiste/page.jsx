"use client";

import React from "react";
import axios from "axios";
import ArtistPublicForm from "../../components/ArtistPublicForm";
import "../../styles/inscription-artiste.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopupMessage from "../../components/PopupMessage"; // adapte si besoin
import { useState } from "react";

const InscriptionArtistePage = () => {
  const [popup, setPopup] = useState(null); // ✅ popup state
  const handleSubmit = async (formData, event) => {
    if (event) event.preventDefault(); // ✅ Empêche le rechargement

    try {
      console.log('style =>', formData.style);
      const res = await axios.post("http://localhost:5000/api/artists/register", formData);
      if (res.status === 201) {
        setPopup({ type: "success", message: "✅ Inscription envoyée avec succès !" });
      } else {
        setPopup({ type: "error", message: "❌ Erreur lors de l'enregistrement." });
      }
    } catch (err) {
      console.log("Erreur reçue :", err);
    
      const backendMessage = err?.response?.data?.message;
    
      if (err?.response?.status === 400 && backendMessage) {
        setPopup({ type: "error", message: `❌ ${backendMessage}` });
      } else {
        console.error("❌ Erreur d'inscription :", err);
        setPopup({ type: "error", message: "❌ Une erreur serveur est survenue." });
      }
    }
    
    
  };

  return (
    <>
      <Header />
      <main>
      {popup && (
          <PopupMessage
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(null)}
          />
        )}
        <ArtistPublicForm mode="create" showWorkUpload={false}onSubmit={handleSubmit} />
      </main>
      <Footer />
    </>
  );
};

export default InscriptionArtistePage;
