"use client";

import { useSearchParams } from "next/navigation";
import ArtistForm from "../../components/ArtistForm";
import UserForm from "../../components/UserForm";
import "../../styles/inscription-artiste.css";
import "../../styles/inscription-redirection.css";
import { useEffect } from "react";

export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "artist" ou "user"

  useEffect(() => {
    document.body.classList.add("inscription-open");
    return () => {
      document.body.classList.remove("inscription-open");
    };
  }, [type]);

  return (
      <div className="page-container">
      <main className="page-content main-content">
      {type === "artist" && <ArtistForm mode="create" showWorkUpload={false} />}
      {type === "user" && <UserForm />}

      {!type && (
        <>
          <div className="inscription-choice">
            <h2>Quel type d’inscription souhaitez-vous ?</h2>
            <div className="button-group">
              <a href="/inscription?type=artist" className="inscription-btn">
                🎨 Je suis un artiste
              </a>
              <a href="/inscription?type=user" className="inscription-btn">
                👤 Je suis un utilisateur
              </a>
            </div>
          </div>

          {/* ✅ Ajout d’un espace uniquement si aucun type sélectionné */}
          <div style={{ minHeight: "calc(100vh - 800px)" }}></div>
        </>
      )}
    </main>
    </div>
  );
}
