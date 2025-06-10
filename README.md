# 🍕 Pizza Montano Clicker

Un jeu idle clicker amusant sur le thème de la pizza avec des publicités intégrées pour la pizzeria Montano.

## 📋 Description

Pizza Montano Clicker est un jeu web interactif où les joueurs cliquent pour produire des pizzas et peuvent acheter des améliorations pour automatiser leur production. Le jeu inclut des pop-ups publicitaires amusants qui font la promotion des offres spéciales de la pizzeria Montano.

## ✨ Fonctionnalités

- **Système de clic** : Cliquez sur la pizza pour gagner des points
- **Améliorations** : 6 types d'améliorations différentes (Chef, Four, Assistant, Livraison, etc.)
- **Pop-ups publicitaires** : Messages promotionnels avec images attrayantes
- **Sauvegarde automatique** : Progression sauvegardée localement
- **Gain hors ligne** : Continuez à gagner des pizzas même quand vous ne jouez pas
- **Partage social** : Screenshots et partage sur Facebook/Twitter avec #PizzaMontano
- **Design responsive** : Compatible mobile et desktop

## 🚀 Installation

1. Téléchargez et décompressez le fichier ZIP
2. Ouvrez le fichier `index.html` dans votre navigateur web
3. Commencez à jouer !

## 🎮 Comment jouer

1. **Cliquez sur la pizza** pour gagner des pizzas
2. **Achetez des améliorations** pour automatiser la production
3. **Regardez les pop-ups** publicitaires pour découvrir les offres Montano
4. **Partagez votre score** sur les réseaux sociaux
5. **Visitez la vraie pizzeria** via les liens Facebook et Google Maps

## 🛠️ Structure du projet

```
pizza_clicker/
├── index.html          # Page principale du jeu
├── style.css           # Styles et design
├── script.js           # Logique du jeu
├── assets/             # Images pour les pop-ups
│   ├── pizza_margherita.png
│   ├── delivery_scooter.png
│   ├── chef_montano.png
│   └── cheese_pizza.png
└── README.md           # Ce fichier
```

## 🍕 Liens vers Pizza Montano

- **Facebook** : https://www.facebook.com/pizzamontano/?locale=fr_FR
- **Avis Google Maps** : Lien direct vers les évaluations

## 🎯 Équilibrage du jeu

Le jeu est conçu pour offrir une progression équilibrée :
- Les améliorations deviennent progressivement plus chères
- Les pop-ups apparaissent toutes les 30 secondes maximum
- Le gain hors ligne est limité à 8 heures maximum
- La sauvegarde se fait automatiquement toutes les 10 secondes

## 💻 Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari, Edge (versions récentes)
- **Appareils** : Desktop, tablette, mobile
- **Résolution** : Design responsive adaptatif

## 🔧 Personnalisation

Pour personnaliser le jeu :
1. Modifiez les messages publicitaires dans `script.js` (variable `adMessages`)
2. Changez les images dans le dossier `assets/`
3. Ajustez les couleurs dans `style.css` (variables CSS)
4. Modifiez l'équilibrage dans `upgradeDefinitions`

## 📱 Fonctionnalités de partage

- **Screenshot** : Capture automatique du jeu avec html2canvas
- **Facebook** : Partage direct avec hashtag #PizzaMontano
- **Twitter** : Tweet automatique avec score et liens
- **Presse-papier** : Copie automatique du message de partage

## 🐛 Dépannage

**Le jeu ne se charge pas :**
- Vérifiez que JavaScript est activé
- Utilisez un navigateur récent
- Ouvrez la console développeur pour voir les erreurs

**Les images ne s'affichent pas :**
- Vérifiez que le dossier `assets/` est présent
- Assurez-vous que les fichiers images ne sont pas corrompus

**La sauvegarde ne fonctionne pas :**
- Vérifiez que le localStorage est activé
- Ne jouez pas en mode navigation privée

## 📄 Licence

Ce projet est créé pour la pizzeria Montano. Tous droits réservés.

## 👨‍💻 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Bon appétit et amusez-vous bien ! 🍕**

