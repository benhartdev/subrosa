import React from "react";
import { FaEnvelope } from "react-icons/fa"; // ou ton propre SVG

const ArtistMessageBadge = ({ messageCount }) => {
  return (
    <div className="message-badge-wrapper">
      <FaEnvelope className="envelope-icon" />
      {messageCount > 0 && (
        <span className="message-count">{messageCount}</span>
      )}
    </div>
  );
};

export default ArtistMessageBadge;
