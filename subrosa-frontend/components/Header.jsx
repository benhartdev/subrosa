import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';
import '../styles/header.css'; // Importation du fichier CSS pour le style du header




console.log("Header.js est chargé.");


const Header = () => {

    return (

<header>
            {/* Logo de la galerie */}
        <Image 
            className="header-svg"
            src="/images/gallerie SUB logo.svg"
            alt="Icône SVG"
            width={200}
            height={100}
        />
        <HamburgerMenu /> {/* Affichage du menu hamburger */}

            {/* Barre de navigation principale */}

    <nav className="sidebar">
        <ul className="links">
            <li><Link href="/" className="nav-link">Accueil</Link></li>
            <li><Link href="/oeuvres" className="nav-link">Nos œuvres</Link></li>
            <li><Link href="/page_nos_artistes" className="nav-link">Nos artistes</Link></li>
            <li><Link href="#" className="nav-link">Sub Rosa BLOG</Link></li>
            <li><Link href="#" className="nav-link">Qui sommes-nous</Link></li>
            <li><Link href="#" className="nav-link">Contact</Link></li>
            <li><Link href="/inscription-artiste" className="nav-link">Inscription artiste</Link></li>
        </ul>
    </nav>
</header>
    );
};

export default Header;
