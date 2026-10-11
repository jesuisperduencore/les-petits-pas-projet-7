# Cahier de recette

| ID | Objectif | Prérequis | Étapes | Résultat attendu | Résultat obtenu |
|---|---|---|---|---|---|
| REC-01 | Connexion staff | Compte staff actif | Se connecter, rafraîchir | Redirection /staff et session maintenue | Conforme en démo |
| REC-02 | Connexion parent | Compte parent1 actif | Se connecter | Redirection /parent | Conforme en démo |
| REC-03 | Isolation parent 1/2 | Deux familles | Modifier l'URL avec l'ID de l'autre enfant | Accès refusé, aucune donnée retournée | À vérifier sur Supabase lié |
| REC-04 | Liste staff | Données de test | Rechercher Lina, filtrer Bébés | Une seule carte correspondante | Conforme en démo |
| REC-05 | Médicament autorisé | Enfant autorisé | Créer événement médicament | Événement enregistré | À vérifier sur Supabase lié |
| REC-06 | Médicament refusé | Enfant non autorisé | Créer événement médicament | Blocage client et serveur | À vérifier sur Supabase lié |
| REC-07 | Message parent | Parent rattaché | Envoyer moins de 500 caractères | Message statut nouveau | À vérifier sur Supabase lié |
| REC-08 | Message trop long | Parent rattaché | Envoyer 501 caractères | Refus clair | Conforme par validation |
| REC-09 | Bonus météo | API accessible | Ouvrir la vue parent | Température et conseil affichés | Conforme en maquette |
| REC-10 | Responsive | Téléphone/tablette | Parcourir tous les écrans | Aucun débordement ni action masquée | Conforme visuellement |
