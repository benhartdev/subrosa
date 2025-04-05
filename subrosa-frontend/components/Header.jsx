import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from './HamburgerMenu';

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
            <nav id="nav-bar" className="sidebar">
                <ul className="links">
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/oeuvres">Nos œuvres</Link></li>
                    <li><Link href="/page_nos_artistes">Nos artistes</Link></li>
                    <li><Link href="/inscription-artiste">Inscription artiste</Link></li>
                    <li><Link href="#">Sub Rosa BLOG</Link></li>
                    <li><Link href="#">Qui sommes-nous</Link></li>
                    <li><Link href="#">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
