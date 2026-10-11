# Tableau de bugs

| ID | Anomalie | Gravité | Statut | Correction / décision |
|---|---|---|---|---|
| BUG-01 | Le bouton d'envoi accepte un message vide dans la maquette | Majeure | Corrigé | Trim et validation serveur 1-500 |
| BUG-02 | Le médicament pouvait être validé uniquement côté client | Bloquante | Corrigé | Action serveur + trigger SQL |
| BUG-03 | Le filtre section n'était pas empilé sur mobile | Mineure | Corrigé | Règle responsive sous 760 px |
| BUG-04 | Invitation Resend non testable sans clés réelles | Majeure | Nouveau | Bloque uniquement l'intégration externe |
| BUG-05 | Un événement créé en mode démonstration disparaissait après la redirection | Bloquante | Corrigé | Sauvegarde locale avant navigation et conservation de la date locale |
| BUG-06 | Le résumé de la fiche ne comptait pas les événements de démonstration | Mineure | Corrigé | Compteur client synchronisé avec la timeline locale |
