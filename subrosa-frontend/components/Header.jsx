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
    <header className={styles.header}>
      <div className={styles.mainNav}>
        <div className={styles.iconWrapper}>
          {!user ? (
            <>
              <Link href="/login" legacyBehavior>
                <a className={styles.iconSvg}>
                  <FontAwesomeIcon icon={faSignInAlt} />
                </a>
              </Link>
              <Link href="/inscription" legacyBehavior>
                <a className={styles.iconSvg}>
                  <FontAwesomeIcon icon={faUserPlus} />
                </a>
              </Link>
            </>
          ) : (
            <button onClick={logout} className={`${styles.iconSvg} ${styles.logoutIcon}`}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}

          <div ref={menuRef}>
            <button className={styles.menuToggle} onClick={toggleMenu}>☰</button>

            {isMenuOpen && (
              <>
                <ul className={styles.mobileMenu}>
                  <li><Link href="/" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Accueil</a></Link></li>
                  <li><Link href="/page-gallerie?type=works" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Nos œuvres</a></Link></li>
                  <li><Link href="/page-gallerie?type=artist" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Nos artistes</a></Link></li>
                  <li><Link href="/blog" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Sub Rosa Blog</a></Link></li>
                  <li><Link href="/about" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Qui sommes-nous</a></Link></li>
                  <li><Link href="/contact" legacyBehavior>
                    <a onClick={() => setIsMenuOpen(false)}>Contact</a></Link></li>
                  {!user ? (
                    <>
                      <li><Link href="/login" legacyBehavior>
                        <a onClick={() => setIsMenuOpen(false)}>Se connecter</a></Link></li>
                      <li><Link href="/inscription" legacyBehavior>
                        <a onClick={() => setIsMenuOpen(false)}>S'enregistrer</a></Link></li>
                    </>
                  ) : (
                    <li>
                      <button onClick={logout} className={styles.logoutBtn}>
                        Se déconnecter<br />{user.username}
                      </button>
                    </li>
                  )}
                  {user?.role === "artist" && (
                    <li>
                      <Link href="/ajouter-oeuvre" legacyBehavior>
                        <a className={styles.addWorkInsideMenu}>➕ Ajouter une œuvre</a>
                      </Link>
                    </li>
                  )}
                </ul>
                <div className={styles.overlay} onClick={toggleMenu}></div>
              </>
            )}
          </div>
        </div>

        <nav className={styles.navbarWrapper}>
          <ul className={styles.navbarNavCustom}>
            <li className={styles.navItem}><Link href="/inscription" legacyBehavior><a className={styles.navLink}>Inscription</a></Link></li>
            <li className={styles.navItem}><Link href="/blog" legacyBehavior><a className={styles.navLink}>Sub Rosa Blog</a></Link></li>
            <li className={styles.navItem}><Link href="/page-gallerie?type=artist" legacyBehavior><a className={styles.navLink}>Nos artistes</a></Link></li>
            <li className={styles.navItem}><Link href="/" legacyBehavior><a className={`${styles.navLink} ${styles.navAccueil}`}>Accueil</a></Link></li>
            <li className={styles.navItem}><Link href="/page-gallerie?type=works" legacyBehavior><a className={styles.navLink}>Nos œuvres</a></Link></li>
            <li className={styles.navItem}><Link href="/about" legacyBehavior><a className={styles.navLink}>Qui sommes-nous</a></Link></li>
            <li className={styles.navItem}><Link href="/contact" legacyBehavior><a className={styles.navLink}>Contact</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
