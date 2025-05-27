"use client";

import React, { useState } from "react";
import styles from './PersonalLogin2.module.css';

import { useRouter } from 'next/navigation';
import axios from "axios";
import { useAuth } from "../components/context/AuthContext.jsx";

const PersonalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Tentative de login avec", username, password);
  
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
  
      if (!res || !res.data) {
        alert("Réponse invalide du serveur.");
        return;
      }
  
      const { user } = res.data;
      console.log("👤 Utilisateur reçu :", user);
  
      login(user); // AuthContext
  
      if (user && user._id && user.role === "artist") {
        localStorage.setItem("artist", JSON.stringify(user));
        console.log("✅ ArtistId stocké :", user._id);
      } else {
        console.warn("⚠️ Données manquantes, user non stocké :", user);
      }
  
      // 🛑 NOUVEAU : on attend que la session soit bien active
      const verifySession = await fetch("http://localhost:5000/api/check-session", {
        method: "GET",
        credentials: "include",
      });
  
      if (!verifySession.ok) {
        throw new Error("Session non active juste après login");
      }
  
      const sessionData = await verifySession.json();
      console.log("🔐 Session confirmée :", sessionData);
  
      // ✅ Redirection une fois que la session est assurée
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "artist") {
        router.push("/artiste/dashboard");
      } else {
        router.push("/");
      }
      
    } catch (error) {
      console.error("❌ Erreur lors de la connexion :", error);
      alert("Erreur de connexion : " + (error.response?.data?.message || "Inconnue"));
    }
  };
  
  
  return (
    <main>
      <div className={styles.containerLogin}>
        <div>
          <h1 className={styles.personalSpace}>ESPACE PERSONNEL</h1>
          <p className={styles.alreadyClient}>
            Nouvel utilisateur ? {" "}
            <a
              href="/inscription"
              className={styles.LoginLink}
            >
              Cliquez ici pour vous inscrire
            </a>
          </p>
        </div>

        <div className={styles.BoxComponent}>
          

          <form className={styles.form} onSubmit={handleLogin}>
            <FormInput
              label="Nom d'utilisateur"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <FormInput
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className={styles.buttonGroup}>
              <Button type="submit" className={styles.buttonPrimary}>
                SE CONNECTER
              </Button>

              <Button type="button" className={styles.buttonSecondary}>
                MOT DE PASSE PERDU ?
              </Button>
            </div>

            <div className={styles.divider} />
          </form>
        </div>
      </div>
    </main>
  );
};

const FormInput = ({ label, type, value, onChange, required }) => (
  <div className={styles.inputField}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={styles.input}
    />
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export default PersonalLogin;
