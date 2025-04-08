import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';
import '../styles/header.css'; // Importation du fichier CSS pour le style du header
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";


console.log("Header.js est chargé.");


const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
  
    return (

<header className="header">
            {/* Logo de la galerie */}
        <Image 
            className="header-svg"
            src="/images/gallerie SUB logo.svg"
            alt="Icône SVG"
            width={200}
            height={100}
        />
        <div className="auth-buttons">
        {user ? (
              <button className="login-button" onClick={logout}>Se déconnecter ({user.role})</button>
            ) : (
              <button className="login-button" onClick={() => router.push('/login')}>Se connecter</button>
            )}
    <button className="login-button_2" onClick={() => router.push('/inscription-utilisateur')}>S'enregistrer</button>
  </div>
        <HamburgerMenu /> {/* Affichage du menu hamburger */}

            {/* Barre de navigation principale */}

    <nav className="sidebar">
        <ul className="links">
            <li><Link href="/" className="nav-link">Accueil</Link></li>
            <li><Link href="/oeuvres" className="nav-link">Nos œuvres</Link></li>
            <li><Link href="/page_nos_artistes" className="nav-link">Nos artistes</Link></li>
            <li><Link href="#" className="nav-link">Sub Rosa BLOG</Link></li>
            <li><Link href="/about" className="nav-link">Qui sommes-nous</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
            <li><Link href="/inscription-artiste" className="nav-link">Inscription artiste</Link></li>
            
        </ul>
    </nav>
</header>
    );
};

export default Header;
