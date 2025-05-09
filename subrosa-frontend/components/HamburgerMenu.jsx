// components/HamburgerMenu.js
"use client";


import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

const HamburgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { user, logout } = useAuth();
    const router = useRouter();

    const toggleMenu = () =>  setIsMenuOpen(!isMenuOpen);
;

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false); // Ferme le menu si le clic est en dehors
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Nettoyage de l'écouteur d'événements
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div ref={menuRef}>
            {/* Bouton hamburger */}
            <button id="menu-toggle" onClick={toggleMenu}>☰</button>

            {/* Menu hamburger */}
            {isMenuOpen && (
                
                <ul ref={menuRef} className="mobile-menu">
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/nos_oeuvres">Nos œuvres</Link></li>
                    <li><Link href="/nos-artistes">Nos artistes</Link></li>
                    <li><Link href="/blog">Sub Rosa Blog</Link></li>
                    <li><Link href="/about">Qui sommes-nous</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/inscription-artiste">inscription artiste</Link></li>
                    {!user ? (
                        <>
                            <li><Link href="/login">Se connecter</Link></li>
                            <li><Link href="/inscription-utilisateur">S'enregistrer</Link></li>
                       </>
                    ) : ( 
                    <li>
                        <button onClick={logout} className="logout-btn">
                            Se déconnecter<br />{user.username}
                        </button>
                    </li>
                    )}
                    {user?.role === "artist" && (
                    <li>
                        <Link href="/ajouter-oeuvre">
                        <button className="add-work-inside-menu">➕ Ajouter une œuvre</button>
                        </Link>
                    </li>
                    )}              
                </ul>
            )}
            {isMenuOpen && (
  <div className="overlay" onClick={toggleMenu}></div>
)}
        </div>
    );
};

module.exports = HamburgerMenu;
