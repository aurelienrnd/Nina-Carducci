# 🌐 Nina-Carducci
Optimisation d’un portfolio pour photographe

## ✅ Objectif
- Amélioration des performances selon le rapport Google Lighthouse
- Optimisation du SEO selon le rapport Google Lighthouse
- Amélioration de l’accessibilité selon le rapport Google Lighthouse
- Débogage du carrousel et des filtres de la galerie

## 🔧 Détails des optimisations et interventions effectuées

- Score Google LightHouse avant intervention:
  - Performace 72%
  - SEO 73%
  - Accessibilité 70%

- Score Google LightHouse après intervention:
  - Performace 97%
  - SEO 100%
  - Accessibilité 100%

### Performace
- Les images
  - Formatage des images au format WebP.
  - Redimensionnement des images aux dimensions d’affichage. 
  - Mise en place du lazy-loading pour les images hors écran dans le carrousel. 
  - Ajout d’une image à utiliser dans les balises Open Graph, Twitter et Schema.org.

- Fichiers CSS
  - Utilisation de la version minifiée du fichier Bootstrap dans le HTML, ligne 27. 
  - Suppression du contenu inutile du fichier style.css. 
  - Création d’une version minifiée de style.css et utilisation à la ligne 28 du HTML.

- Fichiers Js
  - Utilisation de la version minifiée du fichier Bootstrap dans le HTML, ligne 33. 
  - Création d’une version minifiée du fichier maugallery.js et utilisation à la ligne 35.

### SEO
- Amélioration du référencement
  - L’ajout d’une balise `<title>` à la ligne 4 comprenant 64 caractères. 
  - Ajout d’une balise `<meta description>` à la ligne 6 comprenant 137 caractères. 
  - D’une balise `<html lang="fr-FR">` à la ligne 2 pour préciser la langue utilisée. 
  - Ajout d’attributs alt pour chaque image du site.

- Référencement local et intégration des réseaux sociaux. 
  - Création d’un footer avec les info de localisation, de contact et les horaires. 
  - Création de données structurées avec une balise `<script>` à la ligne 218. 
  - Ajout de balises `<meta property="og:type">` pour utiliser Open Graph,  ligne 10 à 18. 
  - Ajout de balises `<meta name="twitter">` pour utiliser Twitter Card, de la ligne 20 à 25.

### Accessibilité
- Ajout de plusieurs attributs manquants. 
  - Ajout des attributs alt sur les images pour afficher une description. 
  - Ajout de l’attribut for sur les labels du formulaire pour les lier à leur balise `<input>`. 
  - Ajout de l’attribut lang="fr-FR" dans la balise `<html>` pour spécifier la langue utilisée. 
  -Ajout de placeholder dans les balise input du formulaire

- Ajout de balises. 
  - Ajout d’une balise `<title>` pour fournir un contexte sur le contenu de la page.

- Modification de balises. 
  - Ajout des balises `<header>`, `<main>` et `<footer>`. 
  - Ajout de plusieurs balises `<section>` et `<article>` pour structurer le contenu. 
  - Ajout de la balise `<nav>` pour les éléments de navigation. 
  - Réorganisation des titres dans un ordre logique un `<h1>` pour l’ensemble de la page, suivi de `<h2>`, `<h3>` et `<h4>`.

- Modification du contraste pour une meilleure visibilité et respect des normes WCAG AA. 
  - Modification de la propriété background-color de la classe CSS .nav-pills .nav-link.active et .nav-pills .show > .nav-link de #BEB45A à #8A7500. 
  - Ajout de aria-label sur les bouton Previous et Next du carrousel

### Débogage
- Problème avec les boutons de navigation de la modale.  
  - Ajout de -1 à la ligne 198 du fichier maugallery.js dans la fonction prevImage pour permettre la navigation vers l’image précédente.
  - Ajout de +1 à la ligne 245 du fichier maugallery.js dans la fonction nextImage pour permettre la navigation vers l’image suivante. 

- Problème de background lors du clic sur les filtres. 
  - Ajout de la classe .active à la ligne 319 sur l’élément cliqué afin d’appliquer le style CSS correspondant. 