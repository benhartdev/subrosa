// components/context/AuthContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // lecture du localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

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
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
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
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
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