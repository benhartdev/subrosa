# ✅ Plan de test rapide après merge – SUB ROSA ART

## 🧱 1. Tests généraux

- [ ] Page d'accueil s'affiche correctement
- [ ] Menus et navigation fonctionnels (desktop + mobile)
- [ ] Aucun style cassé sur les pages principales
- [ ] Aucun message d'erreur inattendu en console (frontend)
- [ ] Aucun crash du backend (`npm run dev` côté API)

---

## 👤 2. Utilisateur / Client

- [ ] Inscription utilisateur fonctionne
- [ ] Connexion utilisateur OK
- [ ] Déconnexion fonctionne
- [ ] Redirection correcte après login
- [ ] Abonnement à la newsletter opérationnel
- [ ] Email de confirmation bien reçu

---

## 👨‍🎨 3. Artiste

- [ ] Inscription artiste fonctionne (upload images + infos)
- [ ] Galerie perso de l'artiste visible après ajout d'œuvres
- [ ] Redirection vers `/ajout-oeuvre` après inscription OK
- [ ] Soumission d'œuvres (max 6 en attente) fonctionne
- [ ] Les œuvres apparaissent en miniature après envoi

---

## 🔐 4. Admin

- [ ] Connexion admin fonctionne
- [ ] Dashboard admin accessible uniquement par l’admin
- [ ] Validation / Rejet artistes OK
- [ ] Validation / Rejet œuvres OK
- [ ] Gestion utilisateurs (recherche, suppression, etc.) OK
- [ ] Vue des messages (contact / artistes) fonctionne

---

## 🖼️ 5. Œuvres & Blog

- [ ] Page `/nos-oeuvres` s'affiche avec filtrage
- [ ] Lightbox des œuvres fonctionne
- [ ] Page `/blog` affiche les articles
- [ ] Boutons CTA du blog ouvrent bien la galerie combinée

---

## 🛡️ 6. Sécurité & API

- [ ] Aucune route sensible accessible sans être connecté
- [ ] Les bons rôles sont requis pour chaque action (user, artiste, admin)
- [ ] Le `rateLimiter` n'empêche pas les tests normaux en dev
- [ ] Les messages d’erreur côté client sont clairs et utiles

---

## ⏱️ 7. Performances

- [ ] Pages se chargent en moins de 2 secondes
- [ ] Les images sont bien optimisées (`.webp` ou `.jpg`)
- [ ] Pas de ralentissement dans les galeries ou dashboards

---

✅ **Dernière étape :**  
- [ ] Tout est validé → je peux merger ✅
