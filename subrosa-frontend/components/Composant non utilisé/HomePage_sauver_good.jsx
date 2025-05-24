// src/components/HomePage.jsx

'use client';

import React from 'react';
import '../styles/style_acceuil.css';  // On importe le fichier CSS lié à cette page
import ArtistsGallery from './ArtistsGallery_old';  // Importer le composant ArtistsGallery

const HomePage = () => {
    return (
        <body>
    <header>
      <a href="acceuil.html">
        <img class="header-svg" src="images/gallerie SUB logo.svg" alt="Icône SVG"/>
      </a>
        <nav class="hamburger_menu">
            <button id="menu-toggle">☰</button>
            <ul id="menu">
                <li><a href="acceuil.html">Accueil</a></li>
                <li><a href="page_nos_oeuvres.html">Nos œuvres</a></li>
                <li><a href="page_nos_artistes.html">Nos artistes</a></li>
                <li><a href="#">Artiste en entreprise</a></li>
                <li><a href="#">Sub Rosa BLOG</a></li>
                <li><a href="#">Qui sommes-nous</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <nav id="nav-bar" class="sidebar">
            <ul class="links">
                    <li><a class="nav-link" href="acceuil.html">Acceuil</a></li>
                    <li><a class="nav-link" href="page_nos_oeuvres.html">Nos œuvres</a></li>
                    <li><a class="nav-link" href="page_nos_artistes.html">Nos artistes</a></li>
                    <li><a class="nav-link" href="#Artist_enterprise">Artiste en entreprise</a></li>
                    <li><a class="nav-link" href="#Subscribe">Sub Rosa BLOG</a></li>
                    <li><a class="nav-link" href="#About">Qui sommes-nous</a></li>
                    <li><a class="nav-link" href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

<div class="head-container">
    <img src="images/ben-H.ben-H.BENH3507---Mod-4---Mod.jpg" alt="Image de fond"/>
    <h2 class="texte-superpose">Nos artistes vous ouvrent leur univers...</h2>
    <a href="page_nos_artistes.html">
    <button class="discover-artist">Decouvrez nos artistes</button>
    </a>
</div>
<div class="gallery-header">
<div class="gallery-content">
    <h3 class="gallery-title">
      <span class="gallery-name">GALLERIE</span>
      <span class="gallery-separator"></span>
      <span class="gallery-brand">SUB ROSA ART</span>
    </h3>
    <p class="gallery-subtitle">gallerie d'art contemporain</p>
  </div>
</div>

<div class="navigation-filters">
    <button class="newsletter-button">
      <span class="newsletter-button__text">INSCRIPTION NEWSLETTER</span>
    </button>
  
    <section class="category-filters">
      <a href="page_nos_oeuvres.html">
      <button class="category-button">
        <span class="category-button__text">TOUTES LES OEUVRES</span>
      </button>
      </a>
      <a href="page_nouveautés.html">
      <button class="category-button">
        <span class="category-button__text">NOUVEAUTES</span>
      </button>
      </a>
      <a href="page_photographie.html">
      <button class="category-button">
        <span class="category-button__text">PHOTOGRAPHIES</span>
      </button>
    </a>
      <a href="page_peintures.html">
      <button class="category-button">
        <span class="category-button__text">PEINTURES</span>
      </button>
    </a>
    <a href="page_sculptures.html">
      <button class="category-button">
        <span class="category-button__text">SCULPTURES</span>
      </button>
    </a>
      <a href="page_edition_art.html">
      <button class="category-button">
        <span class="category-button__text">EDITION D'ART</span>
      </button>
    </a>
    </section>
  
    <p class="surprise-text">ou<br />SURPENEZ-MOI</p>
</div>

<section class="featured-section">
    <div class="featured-header">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb2f543ff05e2b7305e10ca14a109e1f3d116941f677d41b5510f4170c292637?placeholderIfAbsent=true&apiKey=6b3112d6797947108e0e370d8b352087"
        class="decorative-line"
        alt="Decorative line"
      />
      <h1 class="featured-title">NOTRE SELECTION DU MOMENT</h1>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb76f89384a903c3428d1958249ea5a9dd8fb847bcbc91c9962d92ea1a14724?placeholderIfAbsent=true&apiKey=6b3112d6797947108e0e370d8b352087"
        class="decorative-line"
        alt="Decorative line"
      />
    </div>
    <main class="featured-content">
      <div class="image-grid">
        
        <article class="grid-column">
          <a href="page_indian_express_1.html">
          <img
            src="images/indian_express_1.jpg"
            class="featured-image"
            alt="photo nommé Indian express 1 de l'artiste Benjamin Hoffelé"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>INDIAN EXPRESS #1</h5>
            <div class="separator"></div> 
            <p>1 250 &#x20AC;</p>
            </div>
        </article>
       
        <article class="grid-column">
          <a href="page_indian_express_2.html">
          <img
            src="images/indian_express_2.jpg"
            class="featured-image"
            alt="Featured content"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>INDIAN EXPRESS #2</h5>
            <div class="separator"></div> 
            <p>1 250 &#8364;</p>
            </div>
        </article>
       
        <article class="grid-column">
          <a href="page_vortex.html">
          <img
            src="images/vortex.jpg"
            class="featured-image"
            alt="Featured content"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>VORTEX</h5>
            <div class="separator"></div> 
            <p>2 250 &euro;</p>
            </div>
        </article>
       
        <article class="grid-column">
          <a href="page_liaison.html">
          <img
            src="images/liaison.jpg"
            class="featured-image"
            alt="Featured content"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>LIAISON</h5>
            <div class="separator"></div> 
            <p>2 850 &euro;</p>
            </div>
        </article>
       
        <article class="grid-column">
          <a href="page_Sourire_fuyant.html">
          <img
            src="images/Sourire_fuyant.jpg"
            class="featured-image"
            alt="Featured content"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>SOURIRE FUYANT</h5>
            <div class="separator"></div> 
            <p>2 850 &euro;</p>
            </div>
        </article>
       
        <article class="grid-column">
          <a href="page_Train_a_quai.html">
          <img
            src="images/Train_a_quai.jpg"
            class="featured-image"
            alt="Featured content"/>
            </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>TRAIN A QUAI</h5>
            <div class="separator"></div> 
            <p>2 850 &#x20AC;</p>
            </div>
        </article>
        
        <article class="grid-column">
          <a href="page_GTA7.html">
          <img
            src="images/GTA_7.jpg"
            class="featured-image"
            alt="Featured content"/>
          </a>
          <div class="info">
            <h4>BEN H</h4>
            <h5>GTA 7</h5>
            <div class="separator"></div> 
            <p>2 850 &euro;</p>
            </div>
        </article>
      </div>

      <div class="artist-container">
        <section class="artists-section">
            <div class="section-header">
              <h2 class="section-title">NOS ARTISTES COUP DE CŒUR</h2>
              <h3 class="section-subtitle">Partagez leur univers…</h3>
            </div>
        
            <ArtistsGallery />  {/* Afficher la galerie d'artistes */}
            
            
            <div class="artists-button-container">
              <a href="page_nos_artistes.html">
                <button class="view-all-btn">VOIR TOUS NOS ARTISTES</button>
              </a>
            </div>
            
           
          </section>
        
          <section class="magazine-section">
            <h2 class="magazine-title">SUB ROSA ART</h2>
            <p class="magazine-subtitle">BLOG</p>
        
            <div class="magazine-grid">
              <article class="magazine-card">
                <div class="card_1">
                  <p class="card-date">date</p>
                  <p class="card-category">titre</p>
                </div>
                <img
                  src="Images/GAELLE.jpg"
                  alt="Blog"
                  class="card-image"
                />
                <div class="card-content">
                  <div class="card-titles">
                    <h3 class="card-title">Title</h3>
                    <p class="card-subtitle">Subtitle</p>
                  </div>
                  <p class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor
                  </p>
                  <a href="#" class="read-more">Lire la suite...</a>
                </div>
              </article>
        
              <article class="magazine-card">
                <div class="card_2">
                  <p class="card-date">date</p>
                  <p class="card-category">header</p>
                </div>
                <img
                  src="Images/GRAFF.jpg"
                  alt="Blog"
                  class="card-image"
                />
                <div class="card-content">
                  <div class="card-titles">
                    <h3 class="card-title">Title</h3>
                    <p class="card-subtitle">Subtitle</p>
                  </div>
                  <p class="card-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor
                  </p>
                  <a href="#" class="read-more">Lire la suite...</a>
                </div>
              </article>
            </div>
          </section>
        
          <section class="concept-section">
            <div class="concept-content">
              <h2 class="concept-title">NOTRE CONCEPT</h2>
              <h3 class="concept-heading">UNE NOUVELLE VISION DE L'ART CONTEMPORAIN</h3>
              <p class="concept-subtitle">Dissimulé sous la rose...</p>
              <p class="concept-description">
                Mis en valeur par des artistes, pour des artistes
              </p>
              <a href="page_concept.html">
              <button class="learn-more-btn">EN SAVOIR PLUS</button>
              </a>
            </div>
          </section>
        
          <section class="reviews-section">
            <svg
              class="reviews-svg"
              width="1323"
              height="310"
              viewBox="0 0 1323 310"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="1323" height="310" fill="#1A1717" />
              <path
                d="M563.5 66L567.654 78.7832H581.095L570.221 86.6836L574.374 99.4668L563.5 91.5664L552.626 99.4668L556.779 86.6836L545.905 78.7832H559.346L563.5 66Z"
                fill="#D9D9D9"
              />
              <path
                d="M611 66L615.266 78.7832H629.07L617.902 86.6836L622.168 99.4668L611 91.5664L599.832 99.4668L604.098 86.6836L592.93 78.7832H606.734L611 66Z"
                fill="#D9D9D9"
              />
              <path
                d="M658 66L662.266 78.7832H676.07L664.902 86.6836L669.168 99.4668L658 91.5664L646.832 99.4668L651.098 86.6836L639.93 78.7832H653.734L658 66Z"
                fill="#D9D9D9"
              />
              <path
                d="M705 66L709.266 78.7832H723.07L711.902 86.6836L716.168 99.4668L705 91.5664L693.832 99.4668L698.098 86.6836L686.93 78.7832H700.734L705 66Z"
                fill="#D9D9D9"
              />
              <path
                d="M752.5 66L756.654 78.7832H770.095L759.221 86.6836L763.374 99.4668L752.5 91.5664L741.626 99.4668L745.779 86.6836L734.905 78.7832H748.346L752.5 66Z"
                fill="#D9D9D9"
              />
              
            
              <circle cx="434" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="469" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="504" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="539" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="574" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="609" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="644" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="679" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="714" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="749" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="784" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="819" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="854" cy="234" r="5" fill="#D9D9D9" />
              <circle cx="889" cy="234" r="5" fill="#D9D9D9" />
            </svg>
            <div class="testimonial-container">
                <h3 class="testimonial-title">EXCELLENT</h3>
                <p class="testimonial-text">« Galerie très pro et avec une belle sensibilité artistique,</p>
                <p class="testimonial-text">une grande ouverture et des artistes des plus talentueux,</p>
                <p class="testimonial-text">je recommande, merci »</p>
            </div>
          </section>
      </div>



    </main>
    <footer>
        <section class="info-banner">
            <div class="info-banner_container">
              <article class="info-banner_item">PAIEMENT EN 3 FOIS SANS FRAIS</article>
              <article class="info-banner_item">TARIFS NÉGOCIÉS</article>
              <article class="info-banner_item">LIVRAISON PREMIUM ET ASSURÉE</article>
              <article class="info-banner_item">PAIEMENTS SÉCURISÉS</article>
              <article class="info-banner_item">
                ŒUVRE A L'ESSAI Retour gratuit sous 15 jours
              </article>
            </div>
        </section>
        <a href="acceuil.html">
            <img class="footer-svg" src="images/gallerie SUB logo.svg" alt="Icône SVG"/>
          </a>
        <section>
                    <nav class="footer-links">
                        <div class="footer-column">
                            <a href="page_nos_oeuvres.html" class="footer-link">NOTRE CATALOGUE</a>
                                <a href="page_nos_oeuvres.html" class="footer-link">LES OEUVRES</a>
                                    <a href="page_nos_artistes.html" class="footer-link">NOS ARTISTES</a>
                        </div>
                        <div class="footer-column">
                            <a href="#galerie" class="footer-link">NOTRE GALERIE</a>
                            <a href="page_qui_sommes_nous.html" class="footer-link">QUI SOMMES NOUS</a>
                            <a href="page_engagement" class="footer-link">NOS ENGAGEMENTS</a>
                            <a href="page_contact" class="footer-link">CONTACTEZ NOUS</a>
                        </div>
                        <div class="footer-column">
                            <a href="#communaute" class="footer-link">NOTRE COMMUNAUTÉ</a>
                            <a href="#join" class="footer-link">REJOINDRE NOS ARTISTES</a>
                            <a href="page_blog" class="footer-link">MAGAZINE “SUB ROSA ART”</a>
                            <a href="page_artiste_entreprise" class="footer-link">ARTISTE EN ENTREPRISE</a>
                        </div>
                    </nav>
        </section>
            
        <div class="newsletter-container">
            <label class="newsletter-label" for="email">INSCRIPTION NEWSLETTER</label>
            <div class="newsletter">
                <input type="email" id="email" placeholder="votre adresse mail"/>
                <button class="subscribe-btn" id="subscribe-btn">OK</button>
            </div>
        </div>
        
        <div class="footer-border_5"></div>
       
        <div class="footer-links_2">
            <nav class="legal-links">
              <a href="page_CGV" class="legal-link">Conditions générales de vente</a>
              <a href="page_defiscalisation" class="legal-link">Défiscalisation / Leasing</a>
              <a href="#" class="legal-link">Confidentialité</a>
              <a href="#" class="legal-link">Mentions légales</a>
            </nav>
        
            <section class="payment-section">
              <p class="payment-text">PAIEMENTS SÉCURISÉS</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/54b69825b170c6f50d3d223f5e8c5bdfa553bf10"
                alt="Payment methods"
                class="payment-methods"
              />
            </section>
        
            <nav class="social-links">
              <a href="#" class="social-link">
                <svg
                  class="social-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2737 10.1635L23.2023 0H21.0872L13.3313 8.82305L7.14125 0H0L9.3626 13.3433L0 24H2.11504L10.3002 14.6806L16.8388 24H23.98M2.8784 1.5619H6.12769L21.0856 22.5148H17.8355"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg
                  class="social-icon"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_159_1077)">
                    <path
                      d="M12.98 2.163C16.184 2.163 16.564 2.175 17.83 2.233C21.082 2.381 22.601 3.924 22.749 7.152C22.807 8.417 22.818 8.797 22.818 12.001C22.818 15.206 22.806 15.585 22.749 16.85C22.6 20.075 21.085 21.621 17.83 21.769C16.564 21.827 16.186 21.839 12.98 21.839C9.77598 21.839 9.39598 21.827 8.13098 21.769C4.87098 21.62 3.35998 20.07 3.21198 16.849C3.15398 15.584 3.14198 15.205 3.14198 12C3.14198 8.796 3.15498 8.417 3.21198 7.151C3.36098 3.924 4.87598 2.38 8.13098 2.232C9.39698 2.175 9.77598 2.163 12.98 2.163ZM12.98 0C9.72098 0 9.31298 0.014 8.03298 0.072C3.67498 0.272 1.25298 2.69 1.05298 7.052C0.99398 8.333 0.97998 8.741 0.97998 12C0.97998 15.259 0.99398 15.668 1.05198 16.948C1.25198 21.306 3.66998 23.728 8.03198 23.928C9.31298 23.986 9.72098 24 12.98 24C16.239 24 16.648 23.986 17.928 23.928C22.282 23.728 24.71 21.31 24.907 16.948C24.966 15.668 24.98 15.259 24.98 12C24.98 8.741 24.966 8.333 24.908 7.053C24.712 2.699 22.291 0.273 17.929 0.073C16.648 0.014 16.239 0 12.98 0ZM12.98 5.838C9.57698 5.838 6.81798 8.597 6.81798 12C6.81798 15.403 9.57698 18.163 12.98 18.163C16.383 18.163 19.142 15.404 19.142 12C19.142 8.597 16.383 5.838 12.98 5.838ZM12.98 16C10.771 16 8.97998 14.21 8.97998 12C8.97998 9.791 10.771 8 12.98 8C15.189 8 16.98 9.791 16.98 12C16.98 14.21 15.189 16 12.98 16ZM19.386 4.155C18.59 4.155 17.945 4.8 17.945 5.595C17.945 6.39 18.59 7.035 19.386 7.035C20.181 7.035 20.825 6.39 20.825 5.595C20.825 4.8 20.181 4.155 19.386 4.155Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_159_1077">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.97998)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg
                  class="social-icon"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_159_1079)">
                    <path
                      d="M20.595 3.18413C16.991 2.93813 8.96398 2.93913 5.36498 3.18413C1.46798 3.45013 1.00898 5.80412 0.97998 12.0001C1.00898 18.1851 1.46398 20.5491 5.36498 20.8161C8.96498 21.0611 16.991 21.0621 20.595 20.8161C24.492 20.5501 24.951 18.1961 24.98 12.0001C24.951 5.81512 24.496 3.45113 20.595 3.18413ZM9.97998 16.0001V8.00013L17.98 11.9931L9.97998 16.0001Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_159_1079">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.97998)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg
                  class="social-icon"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_159_1081)">
                    <path
                      d="M19.98 0H5.97998C3.21898 0 0.97998 2.239 0.97998 5V19C0.97998 21.761 3.21898 24 5.97998 24H19.98C22.742 24 24.98 21.761 24.98 19V5C24.98 2.239 22.742 0 19.98 0ZM8.97998 19H5.97998V8H8.97998V19ZM7.47998 6.732C6.51398 6.732 5.72998 5.942 5.72998 4.968C5.72998 3.994 6.51398 3.204 7.47998 3.204C8.44598 3.204 9.22998 3.994 9.22998 4.968C9.22998 5.942 8.44698 6.732 7.47998 6.732ZM20.98 19H17.98V13.396C17.98 10.028 13.98 10.283 13.98 13.396V19H10.98V8H13.98V9.765C15.376 7.179 20.98 6.988 20.98 12.241V19Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_159_1081">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.97998)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </nav>
        
            <aside class="contact-box">
              <div class="contact-box-border"></div>
              <div class="contact-box-border-outer"></div>
              <div class="contact-content">
                <h2 class="contact-title">UNE QUESTION ?</h2>
                <p class="contact-subtitle">Un conseiller est a votre disposition</p>
                <p class="contact-phone">06 68 10 52 51</p>
                <p class="contact-hours">(du lundi au dimanche de 10h a 19h)</p>
              </div>
            </aside>
          </div>
        
        <p>&copy; 2035 SUB ROSA ART. Tous droits réservés.</p>
    </footer>
  </section>

</body>
    );
};

export default HomePage;
