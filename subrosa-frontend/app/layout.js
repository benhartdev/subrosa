
import "./globals.css";
import { AuthProvider } from '../components/context/AuthContext';
import AutoLogout from '../components/AutoLogout'; 
import "../lib/fontawesome"; 

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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}