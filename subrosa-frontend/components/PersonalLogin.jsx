"use client";

import React, { useState } from "react";
import styles from './PersonalLogin2.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useAuth } from "../components/context/AuthContext.jsx";
import PopupMessage from "../components/PopupMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PersonalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
  
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
  
      if (!res || !res.data) {
        setPopup({ type: 'error', message: "Réponse invalide du serveur." });
        return;
      }
  
      const { user } = res.data;
      login(user); // AuthContext
  
      if (user && user._id && user.role === "artist") {
        localStorage.setItem("artist", JSON.stringify(user));
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
      setPopup({
        type: 'error',
        message: "Erreur de connexion : " + (error.response?.data?.message || "Inconnue")
      });
    }
  };
  
  
  return (
    <main>
      <div className={styles.containerLogin}>
        <div>
           <h1 className={styles.personalSpace}>ESPACE PERSONNEL</h1>
          <p className={styles.alreadyClient}>
            Nouvel utilisateur ? {" "}
            <a href="/inscription" className={styles.LoginLink}>
              Cliquez ici pour vous inscrire
            </a>
          </p>
        </div>

        <div className={styles.BoxComponent}>
           {popup && (
            <PopupMessage type={popup.type} message={popup.message} onClose={() => setPopup(null)} />
          )}

         <form className={styles.form} onSubmit={handleLogin} autoComplete="off">
            <input type="text" name="fake-username" autoComplete="username" style={{ display: "none" }} />
            <input type="password" name="fake-password" autoComplete="new-password" style={{ display: "none" }} />
            <FormInput
            
              label="Nom d'utilisateur"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            
              <label className={styles.label}>Mot de passe</label>
              <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={styles.inputFull}
                        placeholder="********"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                         👁
                    </button>
                    </div>
           

            <div className={styles.buttonGroup}>
              <Button type="submit" className={styles.buttonPrimary}>
                SE CONNECTER
              </Button>

                 
              <Link href="/mot-de-passe-oublie">
                  <Button type="button" className={styles.buttonSecondary}>
                    MOT DE PASSE OUBLIÉ ?
                  </Button>
              </Link>
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
