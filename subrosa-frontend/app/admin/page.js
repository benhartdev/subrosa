import { useState } from 'react';
import { generateToken, login, logout } from '../services/authService';

export default function AdminPage() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleGenerateToken = async () => {
        const token = await generateToken();
        setToken(token);
        setMessage('Token généré avec succès. Vous pouvez maintenant vous connecter.');
    };

    const handleLogin = async () => {
        const response = await login(token);
        setMessage(response.message || 'Connexion échouée.');
    };

    const handleLogout = async () => {
        const response = await logout();
        setMessage(response.message);
    };

    return (
        <div>
            <h1>Administration - Mode CRUD</h1>
            <button onClick={handleGenerateToken}>Générer un Token Admin</button>

            {token && (
                <div>
                    <p>Votre token : {token}</p>
                    <button onClick={handleLogin}>Activer le Mode CRUD</button>
                </div>
            )}

            <button onClick={handleLogout}>Quitter le Mode CRUD</button>
            {message && <p>{message}</p>}
        </div>
    );
}
