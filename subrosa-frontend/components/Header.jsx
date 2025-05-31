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
              <Link href="/login" className={styles.iconSvg}>
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
              <Link href="/inscription" className={styles.iconSvg}>
                <FontAwesomeIcon icon={faUserPlus} />
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
                  <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
                  <li><Link href="/page-gallerie?type=works" onClick={() => setIsMenuOpen(false)}>Nos œuvres</Link></li>
                  <li><Link href="/page-gallerie?type=artist" onClick={() => setIsMenuOpen(false)}>Nos artistes</Link></li>
                  <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Sub Rosa Blog</Link></li>
                  <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>Qui sommes-nous</Link></li>
                  <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

                  {!user ? (
                    <>
                      <li><Link href="/login" onClick={() => setIsMenuOpen(false)}>Se connecter</Link></li>
                      <li><Link href="/inscription" onClick={() => setIsMenuOpen(false)}>S'enregistrer</Link></li>
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
                      <Link href="/ajouter-oeuvre" className={styles.addWorkInsideMenu}>
                        ➕ Ajouter une œuvre
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
            <li className={styles.navItem}><Link href="/inscription" className={styles.navLink}>Inscription</Link></li>
            <li className={styles.navItem}><Link href="/blog" className={styles.navLink}>Sub Rosa Blog</Link></li>
            <li className={styles.navItem}><Link href="/page-gallerie?type=artist" className={styles.navLink}>Nos artistes</Link></li>
            <li className={styles.navItem}><Link href="/" className={`${styles.navLink} ${styles.navAccueil}`}>Accueil</Link></li>
            <li className={styles.navItem}><Link href="/page-gallerie?type=works" className={styles.navLink}>Nos œuvres</Link></li>
            <li className={styles.navItem}><Link href="/about" className={styles.navLink}>Qui sommes-nous</Link></li>
            <li className={styles.navItem}><Link href="/contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
