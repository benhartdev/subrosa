import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MiniBarNav.module.css"; // ✅ CSS Modules

const MiniBarNav = () => {
  const pathname = usePathname();

  // Dictionnaire de noms plus jolis pour certains slugs
  const labelOverrides = {
    artiste: "Nos Artistes",
    oeuvres: "Nos Œuvres",
    contact: "Contact",
    "inscription-artiste": "Inscription Artiste",
    "inscription-utilisateur": "Inscription Utilisateur",
    login: "Connexion",
    about: "À Propos",
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
    <div className={styles.miniBarNavContainer}>
      <div className={styles.miniBarNavBar1} />
      <nav className={styles.miniBarNav}>
        {barNav.map((crumb, index) => (
          <span key={index} className={styles.miniBarNavItem}>
            {index < barNav.length - 1 ? (
              <>
                <Link href={crumb.href} className={styles.miniBarNavLink}>
                  {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
                </Link>
                <span className={styles.miniBarNavSeparator}>›</span>
              </>
            ) : (
              <span className={styles.miniBarNavCurrent}>
                {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
              </span>
            )}
          </span>
        ))}
      </nav>
      <div className={styles.miniBarNavBar2} />
    </div>
  );
};

export default MiniBarNav;
