'use client';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import styles from './AddWorkButton.module.css';

const AddWorkButton = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'artist') return null;

  return (
    <Link href="/ajout-oeuvre" className={styles['addArtworkButton']}>
      <img src="/images/LOGO OEUVRE 1.svg" alt="Icône ajouter œuvre" className={styles['artIcon']} />
      Ajouter une œuvre
    </Link>
  );
};

export default AddWorkButton;
