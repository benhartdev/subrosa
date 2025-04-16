"use client";
import React from "react";
import "../styles/artistProfile.css";
import Image from 'next/image';

const ArtistProfile = () => {
  return (
    <div className="artist-profile">
      <div className="content-wrapper">
        <div className="info-columns">
          <div className="info-column-left">
            <div className="artist-details">
              <p>Pays : France</p>
              <p>Ville : Colombes</p>
              <p>Née en : 1964</p>
              <p>
                Supports et techniques : Encre et acrylique sur toile et
                impression Sérigraphie sur papier
              </p>
            </div>
            <button className="follow-button" role="button" tabIndex={0}>
              <span className="button-text">SUIVRE CET ARTISTE</span>
            </button>
          </div>

          <div className="info-column-right">
            <div className="artist-bio">
              <p className="bio-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <p className="spacer"></p>
              <p className="expo">PARCOURS & EXPOSITIONS</p><br />
              <p className="expo">2020 : salon d'art contemporain, Colombes</p>
              <p className="expo">2019 : salon d'art contemporain, Colombes</p>
              <p className="expo">2019 : salon d'art contemporain, Colombes</p>
              <p className="expo">2019 : salon d'art contemporain, Colombes</p>
              <p className="expo">2018 : salon d'art contemporain, Colombes</p>
              <p className="expo">2017 : salon d'art contemporain, Colombes</p>
              <p className="expo">2017 : salon d'art contemporain, Colombes</p>
              <p className="expo">2016 : salon d'art contemporain, Colombes</p>
              <p className="expo">2016 : salon d'art contemporain, Colombes</p>
              <p className="expo">2016 : salon d'art contemporain, Colombes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="image-full-width">
  <img
    src="/images/benh_2.png"
    alt="Portrait de l’artiste"
    className="image-centered"
  />
</div>

      <div className="interview-section">
        <div className="interview-label">INTERVIEW</div>
        <h2 className="interview-title">RENCONTRE AVEC BEN H</h2>

        <div className="interview-content">
          <div className="question-answer">
            <p className="question">Comment êtes-vous devenue artiste ?</p>
            <p className="answer">
              Ma passion pour le dessin et l'illustration est venue en regardant
              peindre le père de ma meilleure amie Pierre Fonferrier, illustrateur
              et peintre réaliste des années 1990. [...]
            </p>
          </div>

          <div className="question-answer">
            <p className="question">Comment définiriez-vous votre univers ?</p>
            <p className="answer">
              Mon univers se situe entre le dessin et la peinture, fortement
              inspiré par les cadrages photographiques.
            </p>
          </div>

          <div className="question-answer">
            <p className="question">
              Quel artiste (mort ou vivant) aimeriez-vous rencontrer ?
            </p>
            <p className="answer">
              David Hockney, Velasquez et Henry Cartier Bresson.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;