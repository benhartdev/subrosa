"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef}>
      <button className={styles["menu-toggle"]} onClick={toggleMenu}>☰</button>

      {isMenuOpen && (
        <ul className={styles["mobile-menu"]}>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/page-gallerie?type=works">Nos œuvres</Link></li>
          <li><Link href="/page-gallerie?type=artist">Nos artistes</Link></li>
          <li><Link href="/blog">Sub Rosa Blog</Link></li>
          <li><Link href="/about">Qui sommes-nous</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          {!user ? (
            <>
              <li><Link href="/login">Se connecter</Link></li>
              <li><Link href="/inscription">S'enregistrer</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className={styles["logout-btn"]}>
                Se déconnecter<br />{user.username}
              </button>
            </li>
          )}
          {user?.role === "artist" && (
            <li>
              <Link href="/ajouter-oeuvre">
                <button className={styles["add-work-inside-menu"]}>➕ Ajouter une œuvre</button>
              </Link>
            </li>
          )}
        </ul>
      )}

      {isMenuOpen && (
        <div className={styles["overlay"]} onClick={toggleMenu}></div>
      )}
    </div>
  );
};

export default HamburgerMenu;
