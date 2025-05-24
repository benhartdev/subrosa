'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../components/context/AuthContext';
import styles from './autoLogout.module.css';

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
      clearTimeout(activityTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
      clearInterval(countdownRef.current);
      setShowWarning(false);

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

        logoutTimeoutRef.current = setTimeout(() => {
          logout();
        }, 60000);
      }, 600000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

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
        <div className={styles.logoutWarning}>
          <p className={styles.logoutText}>
            ⏳ Inactivité détectée : vous serez déconnecté dans {countdown} seconde{countdown > 1 ? 's' : ''}.
          </p>
        </div>
      )}
    </>
  );
};

export default AutoLogout;
