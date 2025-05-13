"use client";

import React from 'react';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";


console.log("Header.js est chargé.");
const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
  
    return (

<header className="header">
    <div id="mainNav">
      <div className="icon-wrapper">
        {!user ? (
          <>
            <Link href="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
            </Link>
            <Link href="/inscription">
              <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
            </Link>
          </>
        ) : (
          <button onClick={logout} className="nav-icon logout-icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        )}
        <HamburgerMenu />
      </div>
                {/* Barre de navigation principale */}

      <nav className="navbar-wrapper">
        <ul className="navbar-nav-custom">
                <li className="nav-item"><Link href="/inscription" className="nav-link">Inscription</Link></li>
                <li className="nav-item"><Link href="#" className="nav-link">Blog</Link></li>
                <li className="nav-item"><Link href="/nos-artistes" className="nav-link">Nos artistes</Link></li>
                <li className="nav-item"><Link href="/" id="nav-accueil" className="nav-link">Accueil</Link></li>
                <li className="nav-item"><Link href="/nos_oeuvres" className="nav-link">Nos œuvres</Link></li>
                <li className="nav-item"><Link href="/about" className="nav-link">Qui sommes-nous</Link></li>
                <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>
       </ul>
      </nav>
    </div>
</header>
    );
};

export default Header;


          