"use client";

import { useSearchParams } from "next/navigation";
import ArtistForm from "../../components/ArtistForm";
import UserForm from "../../components/UserForm";
import "../../styles/inscription-artiste.css"; // tu peux fusionner plus tard avec une feuille unique
import "../../styles/inscription-redirection.css"; // tu peux fusionner plus tard avec une feuille unique


export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "artist" ou "user"

  return (
    <>
      <main>
        {type === "artist" && <ArtistForm mode="create" showWorkUpload={false} />}
        {type === "user" && <UserForm />}
        {/* Si aucun type n'est spécifié, afficher bouton de selection */}  
             {!type && (
                <div className="inscription-choice">
                    <h2>Quel type d’inscription souhaitez-vous ?</h2>
                    <div className="button-group">
                    <a href="/inscription?type=artist" className="inscription-btn">🎨 Je suis un artiste</a>
                    <a href="/inscription?type=user" className="inscription-btn">👤 Je suis un utilisateur</a>
                    </div>
              </div>
            )}
      </main>
    </>
  );
}
