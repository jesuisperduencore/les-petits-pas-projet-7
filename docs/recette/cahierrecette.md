# Cahier de recette

| ID | Objectif | Prérequis | Étapes | Résultat attendu | Résultat obtenu |
|---|---|---|---|---|---|
| REC-01 | Connexion staff | Compte staff actif | Se connecter, rafraîchir | Jeton staff valide et accès aux deux enfants | Conforme sur Supabase production le 11/10/2026 |
| REC-02 | Connexion parent | Compte parent actif | Se connecter | Jeton parent valide et accès à son enfant | Conforme sur Supabase production le 11/10/2026 |
| REC-03 | Isolation parent 1/2 | Deux familles | Interroger l'ID de l'autre enfant | Accès refusé, aucune donnée retournée | Conforme : réponse vide avec le jeton du parent A |
| REC-04 | Liste staff | Données de test | Rechercher Lina, filtrer Bébés | Une seule carte correspondante | Conforme en démo |
| REC-05 | Médicament autorisé | Enfant autorisé | Créer événement médicament | Événement enregistré | Conforme : HTTP 201 |
| REC-06 | Médicament refusé | Enfant non autorisé | Créer événement médicament | Blocage client et serveur | Conforme : HTTP 400, déclencheur serveur actif |
| REC-07 | Message parent | Parent rattaché | Envoyer moins de 500 caractères | Message statut nouveau | Conforme : HTTP 201 |
| REC-08 | Message trop long | Parent rattaché | Envoyer 501 caractères | Refus clair | Conforme par validation |
| REC-09 | Bonus météo | API accessible | Ouvrir la vue parent | Température et conseil affichés | Conforme en maquette |
| REC-10 | Responsive | Téléphone/tablette | Parcourir tous les écrans | Aucun débordement ni action masquée | Conforme visuellement |

## Comptes et données de recette

Trois comptes confirmés ont été utilisés : deux parents appartenant à deux familles distinctes et un compte équipe. Les mots de passe ne sont pas consignés dans le dépôt. Les données comprennent Lina Martin (autorisation médicament active) et Noé Durand (autorisation inactive).
