"use client";

import React, { useState } from "react";
import "../styles/PersonalLogin.css";
import "../styles/reset.css";

const PersonalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login avec", { email, password });
  };

  return (
    <main>
      <div id="containerLogin">
        <div>
          <h1 id="personal-space">ESPACE PERSONNEL</h1>
          <p id="already-client">
            Déjà client ?{" "}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="loginLink"
            >
              Cliquez ici pour vous connecter
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
