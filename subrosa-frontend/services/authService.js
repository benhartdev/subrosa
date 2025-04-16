const BASE_URL = "http://localhost:5000/api/artists";

// Génère un token (ok)
export const generateToken = async () => {
    const response = await fetch(`${BASE_URL}/generateToken`);
    const data = await response.json();
    return data.token;
};

// Connexion admin (correctif ici)
export const login = async (token) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // <-- pour envoyer le cookie de session
      body: JSON.stringify({ token }),
    });
  
    const data = await response.json();
    return data;
  };
  

// Déconnexion
export const logout = async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
        credentials: 'include' // pour supprimer le cookie
    });
    const data = await response.json();
    return data;
};
