// components/context/AuthContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // validation côté serveur (check-session)
  useEffect(() => {
    console.log("🔁 Session récupérée côté client :", user);
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/check-session", {
          method: "GET",
          credentials: "include",
        });
  
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Erreur de vérification de session :", err);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false); // <-- INDISPENSABLE !
      }
    };
  
    checkSession();
  }, []);

  const login = (userData) => {
    setUser(userData);

  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
     
      window.location.href = "/";
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {isLoading ? <p>Chargement…</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
  };