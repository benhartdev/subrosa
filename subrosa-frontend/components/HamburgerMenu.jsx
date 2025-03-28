// components/HamburgerMenu.js
"use client";

const React = require('react');
const { useState, useEffect, useRef } = React;
const Link = require('next/link');

const HamburgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                <ul id="menu" className="menu">
                    <li><Link href="/acceuil">Accueil</Link></li>
                    <li><Link href="/page_nos_oeuvres">Nos œuvres</Link></li>
                    <li><Link href="/page_nos_artistes">Nos artistes</Link></li>
                    <li><Link href="#">Artiste en entreprise</Link></li>
                    <li><Link href="#">Sub Rosa BLOG</Link></li>
                    <li><Link href="#">Qui sommes-nous</Link></li>
                    <li><Link href="#">Contact</Link></li>
                </ul>
            )}
        </div>
    );
};

module.exports = HamburgerMenu;
