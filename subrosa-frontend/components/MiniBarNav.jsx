import Link from 'next/link';
import '../styles/MiniBarNav.css'; 
import { usePathname } from "next/navigation";


const MiniBarNav = () => {
  const pathname = usePathname();

  // Dictionnaire de noms plus jolis pour certains slugs
  const labelOverrides = {
    "artiste": "Nos Artistes",
    "oeuvres": "Nos Œuvres",
    "contact": "Contact",
    "inscription-artiste": "Inscription Artiste",
    "inscription-utilisateur": "Inscription Utilisateur",
    "login": "Connexion",
    "about": "À Propos",
    "sub-rosa-blog": "SubRosa Blog",
  };

  // Découpe l’URL : ex. "/nos-artistes/ben-h" → ["nos-artistes", "ben-h"]
  const pathParts = pathname.split("/").filter((part) => part.trim() !== "");

  // Crée le lien d’accroche : Accueil
  const barNav = [{ name: "Accueil", href: "/" }];

  pathParts.forEach((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
  
    const cleanedPart = decodeURIComponent(part).trim().toLowerCase();
  
    const name =
      labelOverrides[cleanedPart] ||
      cleanedPart
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
  
    barNav.push({ name, href });
  });

  return (
    <div className="MiniBarNav-container">
      <div className="MiniBarNav-bar_1" />
      <nav className="MiniBarNav">
        {barNav.map((crumb, index) => (
          <span key={index} className="MiniBarNav-item">
            {index < barNav.length - 1 ? (
              <>
                <Link href={crumb.href} className="MiniBarNav-link">
                  {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
                </Link>
                <span className="MiniBarNav-separator">›</span>
              </>
            ) : (
              <span className="MiniBarNav-current">
                {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
              </span>
            )}
          </span>
        ))}
      </nav>
      <div className="MiniBarNav-bar_2" />
    </div>
  );
};

export default MiniBarNav;
