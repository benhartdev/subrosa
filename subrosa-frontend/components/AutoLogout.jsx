'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../components/context/AuthContext';

const AutoLogout = () => {
  const { logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef(null);
  const activityTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('artist')) || JSON.parse(localStorage.getItem('user'));
    if (!session || session.role === 'admin') return;

    const handleActivity = () => {
      // Toute activité détectée => reset
      clearTimeout(activityTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
      clearInterval(countdownRef.current);
      setShowWarning(false);

      // Timer d’inactivité (10 sec ici pour test)
      activityTimeoutRef.current = setTimeout(() => {
        setShowWarning(true);
        setCountdown(60);

        countdownRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownRef.current);
            }
            return prev - 1;
          });
        }, 1000);

        // Déconnexion finale après 5 secondes d’inactivité confirmée
        logoutTimeoutRef.current = setTimeout(() => {
          logout();
        }, 60000); // 5 sec après le warning
      }, 600000); // 10 sec sans activité = déclenchement
    };

    // Ajoute les écouteurs
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    // Démarre le tout dès le début
    handleActivity();

    return () => {
      clearTimeout(activityTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
      clearInterval(countdownRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [logout]);

  return (
    <>
      {showWarning && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#222',
          color: '#fff',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}>
          <p style={{ margin: 0 }}>
            ⏳ Inactivité détectée : vous serez déconnecté dans {countdown} seconde{countdown > 1 ? 's' : ''}.
          </p>
        </div>
      )}
    </>
  );
};

export default AutoLogout;
