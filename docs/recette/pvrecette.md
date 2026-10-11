# Procès-verbal de recette

## Décision actuelle : NO-GO conditionnel

L'interface, les parcours, le schéma SQL, les politiques RLS et les validations sont préparés. La mise en production finale reste refusée tant que les quatre vérifications suivantes ne sont pas exécutées sur les projets Supabase liés et le déploiement Vercel :

1. isolation parent 1 / parent 2 / staff avec comptes réels;
2. invitation parent et notification staff via Resend;
3. suite Playwright verte sur l'URL de staging;
4. absence de clé dans le dépôt et répartition correcte des variables Preview/Production.

Le GO pourra être prononcé lorsque ces conditions seront cochées et qu'aucun bug bloquant ne restera ouvert.
