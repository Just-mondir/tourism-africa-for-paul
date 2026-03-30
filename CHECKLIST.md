# ✅ Checklist de Configuration - Globe Trekker

Utilisez cette checklist pour vérifier que tout est correctement configuré avant de lancer votre site.

## 📦 Installation

- [ ] Node.js 18.17+ installé
- [ ] Projet cloné/téléchargé
- [ ] Dépendances installées (`npm install`)
- [ ] Aucune erreur lors de l'installation

## ⚙️ Configuration Supabase

- [ ] Compte Supabase créé
- [ ] Projet Supabase créé
- [ ] `NEXT_PUBLIC_SUPABASE_URL` copié dans `.env.local`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` copié dans `.env.local`
- [ ] Script SQL exécuté dans Supabase SQL Editor
- [ ] Table `countries` créée et contient des données
- [ ] Table `destinations` créée et contient des données
- [ ] Table `posts` créée et contient des données
- [ ] Table `contact_messages` créée

## 🖼️ Configuration Cloudinary

- [ ] Compte Cloudinary créé
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` ajouté dans `.env.local`
- [ ] (Optionnel) Images uploadées dans Cloudinary
- [ ] (Optionnel) URLs d'images mises à jour dans Supabase

## 🔐 Configuration Google OAuth (Optionnel)

- [ ] Projet créé dans Google Cloud Console
- [ ] Écran de consentement OAuth configuré
- [ ] Identifiants OAuth créés (Client ID et Client Secret)
- [ ] Redirect URIs configurés dans Google Cloud Console :
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
- [ ] Google OAuth activé dans Supabase
- [ ] Client ID et Client Secret configurés dans Supabase

## 🚀 Lancement du Projet

- [ ] Fichier `.env.local` créé et configuré
- [ ] Serveur de développement lancé (`npm run dev`)
- [ ] Site accessible sur `http://localhost:3000`
- [ ] Aucune erreur dans la console du navigateur
- [ ] Aucune erreur dans le terminal

## 🧪 Tests Fonctionnels

### Page d'accueil
- [ ] Page d'accueil s'affiche correctement
- [ ] Section hero visible
- [ ] Destinations populaires affichées (ou message si aucune)
- [ ] Derniers articles affichés (ou message si aucun)

### Navigation
- [ ] Menu de navigation fonctionne
- [ ] Tous les liens fonctionnent
- [ ] Menu mobile fonctionne (sur mobile/réduction de fenêtre)

### Blog
- [ ] Page blog s'affiche (`/blog`)
- [ ] Articles listés correctement
- [ ] Pagination fonctionne (si plusieurs articles)
- [ ] Page article individuelle s'affiche (`/blog/[slug]`)
- [ ] Navigation retour au blog fonctionne

### Contact
- [ ] Page contact s'affiche (`/contact`)
- [ ] Formulaire de contact fonctionne
- [ ] Message de succès affiché après envoi
- [ ] Message enregistré dans Supabase (`contact_messages`)

### Authentification (si configurée)
- [ ] Page login s'affiche (`/login`)
- [ ] Bouton "Se connecter avec Google" fonctionne
- [ ] Connexion Google réussie
- [ ] Redirection vers `/dashboard` après connexion
- [ ] Dashboard affiche les informations utilisateur
- [ ] Bouton de déconnexion fonctionne
- [ ] Page dashboard inaccessible sans connexion (redirection vers login)

## 🎨 Design et UX

- [ ] Design responsive sur mobile
- [ ] Design responsive sur tablette
- [ ] Design responsive sur desktop
- [ ] Animations fluides (Framer Motion)
- [ ] Images optimisées et chargées correctement
- [ ] Couleurs du thème cohérentes
- [ ] Typographie lisible

## 🔍 SEO et Performance

- [ ] Métadonnées configurées (vérifier dans les outils de développement)
- [ ] Images optimisées (Next.js Image + Cloudinary)
- [ ] Temps de chargement acceptable
- [ ] Pas d'erreurs dans la console

## 🐛 Résolution des Problèmes

Si vous avez des problèmes, vérifiez :

- [ ] **Variables d'environnement** : Toutes les variables sont-elles dans `.env.local` ?
- [ ] **Supabase** : Les tables existent-elles et contiennent-elles des données ?
- [ ] **Cloudinary** : Le Cloud name est-il correct ?
- [ ] **OAuth** : Les redirect URIs sont-ils correctement configurés ?
- [ ] **Console** : Y a-t-il des erreurs dans la console du navigateur ?
- [ ] **Terminal** : Y a-t-il des erreurs dans le terminal ?

## 📚 Documentation

- [ ] README.md lu et compris
- [ ] SETUP_GUIDE.md consulté si nécessaire
- [ ] VIDEO_WALKTHROUGH.md consulté si nécessaire
- [ ] Structure du projet comprise

## ✨ Bonus (Optionnel)

- [ ] Personnalisation des couleurs du thème
- [ ] Logo personnalisé ajouté
- [ ] Contenu personnalisé ajouté (destinations, articles)
- [ ] Tests unitaires écrits et passent (`npm test`)
- [ ] Code formaté avec Prettier (`npm run format`)
- [ ] Code linté avec ESLint (`npm run lint`)
- [ ] Projet déployé sur Vercel

---

## 🎯 Prochaines Étapes

Une fois toutes les cases cochées :

1. **Personnalisez** le contenu selon vos besoins
2. **Ajoutez** vos propres destinations et articles
3. **Testez** toutes les fonctionnalités
4. **Déployez** en production (voir README.md)
5. **Partagez** votre site avec le monde !

---

**Besoin d'aide ?** Consultez le [README.md](README.md) ou le [VIDEO_WALKTHROUGH.md](VIDEO_WALKTHROUGH.md) pour plus de détails.

