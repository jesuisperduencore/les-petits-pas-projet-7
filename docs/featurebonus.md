# Bonus - météo et conseil d'habillement

## Objectif
Afficher la météo du jour et un conseil simple pour la sortie, sans transmettre de donnée sur les enfants.

## API
Open-Meteo, appelée côté serveur avec les coordonnées publiques de Marseille. Les données utilisées sont la température, la pluie et le vent.

## Cas limites
- aucun résultat : afficher « Météo indisponible »;
- température absente : ne pas produire de conseil automatique;
- délai de 3 secondes dépassé : annuler l'appel et conserver la timeline utilisable;
- erreur réseau : proposer de réessayer sans bloquer la page.

## Règles
Le conseil reste informatif. Aucune donnée personnelle, médicale ou géographique précise d'une famille n'est envoyée à l'API.
