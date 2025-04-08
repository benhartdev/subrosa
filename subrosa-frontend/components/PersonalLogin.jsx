"use client";

import React, { useState } from "react";
import "../styles/PersonalLogin.css";
import "../styles/reset.css";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";

const PersonalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, {
        withCredentials: true,
      });

      const { role, email: returnedEmail } = res.data || {};
      if (!role) return alert("Rôle non reconnu");

      localStorage.setItem("userRole", role);
      login({ role, email: returnedEmail });

      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "user":
          router.push("/compte");
          break;
        case "artist":
          router.push("/artiste/espace");
          break;
        default:
          router.push("/");
      }

    } catch (error) {
      alert("Erreur de connexion : " + (error.response?.data?.message || "Inconnue"));
    }
  };

  return (
    <main>
      <div id="containerLogin">
        <div>
          <h1 id="personal-space">ESPACE PERSONNEL</h1>
          <p id="already-client">
            Nouveau client ? {" "}
            <a
              href="/inscription-utilisateur"
              className="loginLink"
            >
              Cliquez ici pour vous inscrire
            </a>
          </p>
        </div>

        <div id="box-component">
          <p id="text-login">
            Si vous avez déjà commandé chez nous auparavant, veuillez saisir vos
            coordonnées ci-dessous. Si vous êtes un nouveau client, veuillez
            renseigner la section facturation.
          </p>

          <form className="form" onSubmit={handleLogin}>
            <FormInput
              label="Identifiant ou e-mail *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              label="Mot de passe *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="buttonGroup">
              <Button type="submit" className="button primary">
                SE CONNECTER
              </Button>

              <Button type="button" className="button secondary">
                MOT DE PASSE PERDU ?
              </Button>
            </div>

            <div className="divider" />
          </form>
        </div>
      </div>
    </main>
  );
};

const FormInput = ({ label, type, value, onChange, required }) => (
  <div className="inputField">
    <label className="label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="input"
    />
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export default PersonalLogin;
