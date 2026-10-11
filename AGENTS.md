# Instructions pour les agents IA

## Objectif
Construire l'application Les Petits Pas sans modifier les règles métier ni affaiblir la sécurité.

## Structure
- `app/` : routes Next.js App Router et Server Actions.
- `components/` : composants métier et composants UI réutilisables.
- `lib/` : clients Supabase, validations et données de démonstration.
- `supabase/migrations/` : schéma, triggers et politiques RLS versionnés.
- `docs/` : modèle de données, bonus et recette.
- `tests/` : scénarios Playwright.

## Conventions
- TypeScript strict, composants fonctionnels et rendu serveur par défaut.
- Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` ni `RESEND_API_KEY` au client.
- Toute écriture sensible passe par une Server Action avec validation serveur.
- Les médicaments exigent `parent_authorization = true` côté client et côté serveur.
- Tous les accès parent doivent être protégés par RLS et une vérification serveur.
- Ne jamais committer `.env.local`, `JOURNAL.md`, mots de passe ou clés.

## Product Backlog
Avant une tâche, passer sa ligne à `En cours` dans `backlog.md`. Après implémentation et vérification, la passer à `Terminé`. Cette mise à jour est obligatoire et automatique, sans attendre une relance de l'utilisateur.

## Éléments à ne jamais modifier sans validation
- La séparation des rôles `staff` et `parent`.
- Les politiques RLS et les tests d'isolation.
- La limite de 500 caractères des messages.
- Les migrations déjà appliquées en production.
