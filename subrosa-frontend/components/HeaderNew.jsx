import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


import '../styles/HeaderNew.css'; 
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
  
    return (
        <header className="header">
        <div id="mainNav">
        <nav role="navigation">
          <div className="logo-container">
            <Image src="/images/gallerie SUB logo.svg" alt="Icône SVG" width="400" height="400" />
          </div>
        </nav>
        <div class="navbar-wrapper">
                <ul class="navbar-nav-custom">
                    <li class="nav-item"><a class="nav-link" href="#">Inscription artiste</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Nos artistes</a></li>
                    <li class="nav-item"><a id="nav-accueil" class="nav-link" href="#">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Nos œuvres</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Qui sommes-nous</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                </ul>
        </div>
        </div>
      
      </header>
     );
};

export default Header;