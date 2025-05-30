import "./globals.css";
import { AuthProvider } from "../components/context/AuthContext";
import AutoLogout from "../components/AutoLogout";
import "../lib/fontawesome";
import "../components/Header.module.css";
import "../components/Footer.module.css";
import BodyClassManager from "../components/BodyClassManager";
import PopupManager from "../components/PopupManager";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LayoutClient from "./LayoutClient"; // ← ton nouveau composant client

export const metadata = {
  title: "SUB ROSA",
  description: "Vente d’art et œuvres uniques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <BodyClassManager />
        <AuthProvider>
          <AutoLogout />
          <div className="page-container">
            <Header />
            <LayoutClient>
              <div className="page-content main-content">
                <PopupManager />
                {children}
              </div>
            </LayoutClient>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
