import React from "react";
import "../styles/PendingStatusBanner.css"; // fichier CSS que tu peux créer à côté

const PendingStatusBanner = ({ username }) => {
  return (
    <div className="pending-banner">
      <p>
        Bonjour <strong>{username}</strong>, votre compte artiste est en cours de validation.
        <br />
        Vous serez notifié par email une fois votre profil accepté ou refusé.
      </p>
    </div>
  );
};

export default PendingStatusBanner;
