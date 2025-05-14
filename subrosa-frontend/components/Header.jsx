"use client";

import React from 'react';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from './Header.module.css';

console.log("Header.js est chargé.");

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <header className={styles["header"]}>
            <div className={styles["mainNav"]}>
                <div className={styles["icon-wrapper"]}>
                    {!user ? (
                        <>
                            <Link href="/login">
                                <FontAwesomeIcon icon={faSignInAlt} className={styles["nav-icon"]} />
                            </Link>
                            <Link href="/inscription">
                                <FontAwesomeIcon icon={faUserPlus} className={styles["nav-icon"]} />
                            </Link>
                        </>
                    ) : (
                        <button onClick={logout} className={`${styles["nav-icon"]} ${styles["logout-icon"]}`}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    )}
                    <HamburgerMenu />
                </div>

                {/* Barre de navigation principale */}
                <nav className={styles["navbar-wrapper"]}>
                    <ul className={styles["navbar-nav-custom"]}>
                        <li className={styles["nav-item"]}><Link href="/inscription" className={styles["nav-link"]}>Inscription</Link></li>
                        <li className={styles["nav-item"]}><Link href="#" className={styles["nav-link"]}>Blog</Link></li>
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
