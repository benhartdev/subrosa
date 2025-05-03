'use client';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';


const AddWorkButton = () => {
    const { user } = useAuth();

  if (!user || user.role !== 'artist') return null;

  return (
    <Link href="/ajouter-oeuvre" className="add-artwork-button">
      <img src="/images/LOGO OEUVRE 1.svg" alt="Icône ajouter œuvre" className="art-icon" />
      Ajouter une œuvre
    </Link>
  );
};

export default AddWorkButton;
