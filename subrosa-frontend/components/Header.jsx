"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from './Header.module.css';

console.log("Header fusionné est chargé.");

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    <header className={styles["header"]}>
      <div className={styles["mainNav"]}>
        <div className={styles["icon-wrapper"]}>
          {!user ? (
  <>
    <Link href="/login">
      <button className={styles["nav-icon"]}>
        <FontAwesomeIcon icon={faSignInAlt} />
      </button>
    </Link>
    <Link href="/inscription">
      <button className={styles["nav-icon"]}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </Link>
  </>
) : (
  <button onClick={logout} className={`${styles["nav-icon"]} ${styles["logout-icon"]}`}>
    <FontAwesomeIcon icon={faSignOutAlt} />
  </button>
)}

          {/* Hamburger Menu fusionné */}
          <div ref={menuRef}>
            <button className={styles["menu-toggle"]} onClick={toggleMenu}>☰</button>

            {isMenuOpen && (
              <>
                <ul className={styles["mobile-menu"]}>
                  <li><Link href="/" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Accueil</a></Link></li>
                  <li><Link href="/page-gallerie?type=works" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Nos œuvres</a></Link></li>
                  <li><Link href="/page-gallerie?type=artist" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Nos artistes</a></Link></li>
                  <li><Link href="/blog" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Sub Rosa Blog</a></Link></li>
                  <li><Link href="/about" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Qui sommes-nous</a></Link></li>
                  <li><Link href="/contact" passHref legacyBehavior>
                  <a onClick={() => setIsMenuOpen(false)}>Contact</a></Link></li>
                  {!user ? (
                    <>
                      <li><Link href="/login" passHref legacyBehavior>
                       <a onClick={() => setIsMenuOpen(false)}>Se connecter</a></Link></li>
                      <li><Link href="/inscription" passHref legacyBehavior>
                       <a onClick={() => setIsMenuOpen(false)}>S'enregistrer</a></Link></li>
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
                <div className={styles["overlay"]} onClick={toggleMenu}></div>
              </>
            )}
          </div>
        </div>

        {/* Barre de navigation principale */}
        <nav className={styles["navbar-wrapper"]}>
          <ul className={styles["navbar-nav-custom"]}>
            <li className={styles["nav-item"]}><Link href="/inscription" className={styles["nav-link"]}>Inscription</Link></li>
            <li className={styles["nav-item"]}><Link href="/blog" className={styles["nav-link"]}>Sub Rosa Blog</Link></li>
            <li className={styles["nav-item"]}><Link href="/page-gallerie?type=artist" className={styles["nav-link"]}>Nos artistes</Link></li>
            <li className={styles["nav-item"]}><Link href="/" className={`${styles["nav-link"]} ${styles["nav-accueil"]}`}>Accueil</Link></li>
            <li className={styles["nav-item"]}><Link href="/page-gallerie?type=works" className={styles["nav-link"]}>Nos œuvres</Link></li>
            <li className={styles["nav-item"]}><Link href="/about" className={styles["nav-link"]}>Qui sommes-nous</Link></li>
            <li className={styles["nav-item"]}><Link href="/contact" className={styles["nav-link"]}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
