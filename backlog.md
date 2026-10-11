# Product Backlog - Les Petits Pas

| ID | User Story | Entité | Critères d'acceptation | Statut | Contraintes / dépendances | Description technique |
|---|---|---|---|---|---|---|
| US-01 | En tant qu'utilisateur, je me connecte et suis redirigé selon mon rôle | profiles | Erreur claire, session persistante, staff vers /staff, parent vers /parent | Terminé | Supabase Auth | Middleware et lecture du profil |
| US-02 | En tant que staff, je recherche et filtre les enfants | children, sections | Recherche par nom et filtre par section | Terminé | RLS staff | Liste responsive côté serveur |
| US-03 | En tant que staff, je consulte la fiche et la timeline datée | events | Événements du jour, auteur, sélecteur de date | En cours | Relations enfants/événements | Tri par heure décroissante |
| US-04 | En tant que staff, je saisis 5 types d'événements | events | Repas, sieste, activité, médicament, incident | En cours | Validation serveur | Formulaire et action serveur |
| US-05 | En tant que responsable, je bloque un médicament non autorisé | children, events | Blocage client et serveur | Terminé | Autorisation parentale | Contrainte SQL + action serveur |
| US-06 | En tant que staff, je traite les messages parents | messages | Statuts nouveau, lu, traité | En cours | RLS staff | Action serveur de statut |
| US-07 | En tant que parent, je ne vois que mes enfants | family_members | Accès direct à un autre enfant refusé | Terminé | RLS obligatoire | Policies avec auth.uid() |
| US-08 | En tant que parent, je consulte une timeline par date | events | États chargement, vide, erreur | En cours | RLS parent | Vue parent responsive |
| US-09 | En tant que parent, j'envoie un message de 500 caractères max | messages | Statut nouveau et notification staff | En cours | Resend | Validation serveur et email sans données sensibles |
| US-10 | En tant que staff, j'invite un parent | profiles | Email avec lien sécurisé, retours succès/erreur | À faire | Resend et service_role | Server Action generateLink |
| US-11 | En tant qu'utilisateur, je consulte la météo et un conseil d'habillement | weather | Cas vide, erreur et délai dépassé | Terminé | Open-Meteo | Route serveur sans donnée personnelle |
| US-12 | En tant que PO, je dispose d'une recette traçable | tests | Tests critiques verts, bugs classés, PV Go/NoGo | En cours | Playwright | Documentation sous docs/recette |
