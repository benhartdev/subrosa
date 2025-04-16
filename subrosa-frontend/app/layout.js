
import "./globals.css";
import { AuthProvider } from '../components/context/AuthContext';




export const metadata = {
  title: "SUB ROSA",
  description: "Vente d’art et œuvres uniques",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}