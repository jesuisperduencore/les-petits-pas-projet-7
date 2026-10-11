# Les Petits Pas

Application déployée : https://lespetitspas-gamma.vercel.app

Le dépôt contient l'application Next.js, la migration Supabase avec RLS, les données de démonstration, les tests Playwright et les documents de recette. Le mode démonstration permet de présenter tous les écrans sans exposer de données réelles.

Application Next.js pour centraliser les transmissions quotidiennes d'une crèche associative.

## Fonctionnalités
- Authentification et redirection par rôle staff/parent.
- Liste et fiche enfant avec timeline filtrée par date.
- Saisie de cinq types d'événements avec blocage médicament.
- Messagerie parent vers équipe, statuts nouveau/lu/traité.
- Isolation des familles par politiques Supabase RLS.
- Invitation et notifications via Resend.
- Bonus météo et conseil d'habillement via Open-Meteo.
- Tests Playwright et dossier de recette.

## Installation
1. Copier `.env.example` vers `.env.local` et renseigner les variables.
2. Appliquer les migrations Supabase dans l'ordre.
3. Installer avec `pnpm install` puis lancer `pnpm dev`.

## Environnements
- local : `.env.local` et projet Supabase `lespetitspas`;
- staging : branche `staging`, Vercel Preview et base `lespetitspas`;
- production : branche `main`, Vercel Production et base `lespetitspas-prod`.

Ne jamais pousser directement sur `main`. La production passe par une Pull Request depuis `staging`.
