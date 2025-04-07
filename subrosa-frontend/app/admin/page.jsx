"use client"; // à garder si tu es dans /app

import Header from "../../components/Header"; // ajuste le chemin si besoin
import Footer from "../../components/Footer";
import "../../styles/PersonalLogin.css"; // on garde le style élégant

const AdminPage = () => {
  return (
    <>
      <Header />

      <main id="containerLogin">
        <div id="box-component">
          <h1 id="personal-space">ESPACE ADMINISTRATEUR</h1>

          <p id="text-login">
            Bienvenue dans l’interface d’administration. Ici, vous pouvez gérer :
          </p>

          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "2rem auto", lineHeight: "2" }}>
            <li>✅ Les artistes en attente de validation</li>
            <li>🎨 Les œuvres du catalogue</li>
            <li>👥 Les utilisateurs</li>
            <li>🧾 cLes commandes</li>
          </ul>

          <div className="buttonGroup">
            <button className="button primary">Valider des artistes</button>
            <button className="button primary">Gérer les œuvres</button>
            <button className="button primary">Voir les utilisateurs</button>
            <button className="button primary">Historique des commandes</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminPage;
