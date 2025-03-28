const BASE_URL = "http://localhost:3000/api/artists";

// Fonction pour générer un token d'administration
export const generateToken = async () => {
    const response = await fetch(`${BASE_URL}/generateToken`);
    const data = await response.json();
    return data.token;
};

// Fonction pour activer le mode CRUD (Connexion)
export const login = async (token) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
};

// Fonction pour quitter le mode CRUD (Déconnexion)
export const logout = async () => {
    const response = await fetch(`${BASE_URL}/logout`);
    const data = await response.json();
    return data;
};
