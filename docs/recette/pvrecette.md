# Procès-verbal de recette

## Décision actuelle : GO pour la démonstration et la soutenance

Recette exécutée les 11 et 12 octobre 2026 sur le projet Supabase de production et le déploiement Vercel public.

Vérifications conformes :

- authentification réelle de deux parents et d'un membre de l'équipe;
- isolation RLS : chaque parent voit exactement son enfant, et une tentative d'accès à l'identifiant de l'autre famille retourne une liste vide;
- rôle équipe : accès aux deux enfants;
- médicament autorisé enregistré (HTTP 201) et médicament sans autorisation bloqué par la base (HTTP 400);
- message parent enregistré (HTTP 201);
- migrations appliquées, RLS active sur toutes les tables métier et aucune clé secrète versionnée;
- build de production Next.js réussi et application Vercel accessible.
- création d'un événement depuis l'espace équipe, affichage immédiat, persistance après actualisation et visibilité dans l'espace parent;
- compteur de la timeline cohérent avec les événements affichés;
- branches `main` et `staging` synchronisées, dépôt GitHub connecté à Vercel et dernier déploiement de production au statut READY.

Le contrôle de sécurité Supabase ne remonte aucun défaut de schéma ou de politique RLS. L'option avancée de détection des mots de passe compromis reste indisponible/non activée sur l'offre utilisée et constitue une recommandation d'exploitation, pas un blocage de recette. Les avertissements de performance concernent des index encore peu sollicités et les politiques permissives séparées par rôle; ils sont attendus sur ce petit jeu de données.

Les envois Resend restent simulés tant qu'une clé de service dédiée n'est pas fournie. Cette intégration non essentielle ne bloque pas le MVP présenté : l'interface et le parcours d'invitation sont démontrables, et la configuration attendue est documentée.
