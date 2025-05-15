
// import "./globals.css";
import { AuthProvider } from '../components/context/AuthContext';
import AutoLogout from '../components/AutoLogout'; 
import "../lib/fontawesome"; 
import '../components/Header.module.css';
import '../components/Footer.module.css';

// 🆕 importe Header et Footer
import Header from "../components/Header";
import Footer from "../components/Footer";


export const metadata = {
  title: "SUB ROSA",
  description: "Vente d’art et œuvres uniques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <AutoLogout />
          <Header />
          <main className="page-content">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}