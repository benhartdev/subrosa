import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';
import NavButton from '../components/NavButton'; 
import MiniBarNav from '../components/MiniBarNav'; 
import AddWorkButton from './AddWorkButton';

import '../styles/HeaderNew.css'; // Importation du fichier CSS pour le style du header
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";


console.log("Header.js est chargé.");


const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
  
    return (

<header className="header">
<div id="mainNav">
        {/* <div role="navigation">
                 <div className="logo-container">
                   <Image src="/images/gallerie SUB logo.svg" alt="Icône SVG" width="400" height="400" />
                 </div>
               </div> */}

        <div className="auth-buttons">
  {user ? (
    <button className="login-button" onClick={logout}>
      Se déconnecter <br></br> {user.username}
    </button>
  ) : (
    <NavButton to="/login" label="Se connecter" className="login-button" />
  )}

  <HamburgerMenu />

  {!user || user.role !== 'artist' ? (
  <NavButton to="/inscription-utilisateur" label="S'enregistrer" className="login-button_2" />
) : null}
  
</div>

{user?.role === "artist" && (
  <div className="add-button-wrapper">
    <AddWorkButton />
  </div>
)}
            {/* Barre de navigation principale */}

    <nav className="navbar-wrapper">
    <ul className="navbar-nav-custom">
                    <li className="nav-item"><Link href="/inscription-artiste" className="nav-link">Inscription artiste</Link></li>
                    <li className="nav-item"><Link href="#" className="nav-link">Blog</Link></li>
                    <li className="nav-item"><Link href="/artistes" className="nav-link">Nos artistes</Link></li>
                    <li className="nav-item"><Link href="/" id="nav-accueil" className="nav-link">Accueil</Link></li>
                    <li className="nav-item"><Link href="/nos_oeuvres" className="nav-link">Nos œuvres</Link></li>
                    <li className="nav-item"><Link href="/about" className="nav-link">Qui sommes-nous</Link></li>
                    <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>
                </ul>
    </nav>
    </div>
</header>
    );
};

export default Header;


          