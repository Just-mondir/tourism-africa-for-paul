# 🎥 Guide Vidéo-Script : Configuration Complète de Globe Trekker

Ce document décrit les étapes à suivre dans l'ordre pour configurer et lancer votre site Globe Trekker. Suivez ces étapes comme si vous filmez un tutoriel.

## 📹 Script de Configuration (5-8 étapes)

### Étape 1 : Installation Initiale (2 minutes)

**Ce que vous faites :**
1. Ouvrez votre terminal
2. Naviguez vers le dossier du projet
3. Exécutez : `npm install`

**Ce que vous dites :**
> "Bonjour ! Je vais vous montrer comment configurer Globe Trekker. Commençons par installer les dépendances avec npm install."

**Résultat attendu :**
- Toutes les dépendances sont installées
- Aucune erreur dans le terminal

---

### Étape 2 : Configuration Supabase (5 minutes)

**Ce que vous faites :**

**2.1. Créer un compte Supabase**
1. Ouvrez [supabase.com](https://supabase.com) dans votre navigateur
2. Créez un compte gratuit
3. Confirmez votre email

**2.2. Créer un projet**
1. Cliquez sur "New Project"
2. Donnez un nom : "Globe Trekker" (ou votre choix)
3. Choisissez une base de données (mot de passe fort)
4. Sélectionnez votre région
5. Attendez la création du projet (1-2 minutes)

**2.3. Récupérer les clés API**
1. Dans votre projet Supabase, allez dans **Settings** (icône d'engrenage) > **API**
2. Copiez la **Project URL** (ex: `https://xxxxx.supabase.co`)
3. Copiez la **anon public** key (c'est une longue chaîne de caractères)
4. Ouvrez le fichier `.env.local` à la racine du projet
5. Collez ces valeurs :
   ```
   NEXT_PUBLIC_SUPABASE_URL="votre-project-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-anon-key"
   ```

**2.4. Créer les tables**
1. Dans Supabase, allez dans **SQL Editor** (icône SQL dans la barre latérale)
2. Cliquez sur "New Query"
3. Ouvrez le fichier `supabase/seed.sql` depuis votre éditeur de code
4. Copiez tout le contenu
5. Collez dans l'éditeur SQL de Supabase
6. Cliquez sur "Run" (ou appuyez sur Cmd/Ctrl + Enter)
7. Vérifiez dans **Table Editor** que les tables suivantes existent :
   - ✅ `countries`
   - ✅ `destinations`
   - ✅ `posts`
   - ✅ `contact_messages`

**Ce que vous dites :**
> "Maintenant, configurons Supabase. Je crée un compte, puis un projet, et je récupère mes clés API. Ensuite, j'exécute le script SQL pour créer les tables et insérer des données d'exemple."

**Résultat attendu :**
- Tables créées dans Supabase
- Données d'exemple insérées (3 pays, 4 destinations, 3 articles)

---

### Étape 3 : Configuration Cloudinary (3 minutes)

**Ce que vous faites :**
1. Ouvrez [cloudinary.com](https://cloudinary.com) dans votre navigateur
2. Créez un compte gratuit
3. Dans le **Dashboard**, trouvez votre **Cloud name** (ex: `dxxxxx`)
4. Ouvrez votre fichier `.env.local`
5. Ajoutez :
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
   ```

**Optionnel : Uploader des images**
1. Dans Cloudinary, allez dans **Media Library**
2. Upload quelques images de test (destinations, pays)
3. Copiez les URLs des images
4. Dans Supabase **Table Editor**, modifiez les enregistrements pour utiliser ces URLs

**Ce que vous dites :**
> "Configurons Cloudinary pour les images. Je crée un compte, récupère mon Cloud name, et je l'ajoute aux variables d'environnement."

**Résultat attendu :**
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` configuré dans `.env.local`

---

### Étape 4 : Configuration Google OAuth (5 minutes)

**Ce que vous faites :**

**4.1. Créer un projet Google Cloud**
1. Ouvrez [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet (ou sélectionnez-en un existant)
3. Donnez un nom : "Globe Trekker OAuth"

**4.2. Configurer l'écran de consentement OAuth**
1. Allez dans **APIs & Services** > **OAuth consent screen**
2. Choisissez "External" > **Create**
3. Remplissez :
   - **App name** : "Globe Trekker"
   - **User support email** : Votre email
   - **Developer contact** : Votre email
4. Cliquez sur **Save and Continue**
5. Cliquez sur **Save and Continue** pour les étapes suivantes (Scopes, Test users)

**4.3. Créer des identifiants OAuth**
1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth client ID**
3. Choisissez **Web application**
4. Donnez un nom : "Globe Trekker Web Client"
5. Dans **Authorized redirect URIs**, ajoutez :
   - `http://localhost:3000/auth/callback`
   - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback` (remplacez YOUR_PROJECT_ID par l'ID de votre projet Supabase - trouvable dans Settings > General > Reference ID)
6. Cliquez sur **Create**
7. **IMPORTANT** : Copiez immédiatement votre **Client ID** et **Client Secret** (vous ne pourrez plus voir le secret après)

**4.4. Configurer dans Supabase**
1. Retournez dans Supabase
2. Allez dans **Authentication** > **Providers**
3. Activez **Google** (toggle)
4. Collez votre **Client ID** Google
5. Collez votre **Client Secret** Google
6. Cliquez sur **Save**

**Ce que vous dites :**
> "Maintenant, configurons l'authentification Google OAuth. Je crée un projet dans Google Cloud Console, configure l'écran de consentement, puis je crée des identifiants OAuth. Enfin, je configure Google dans Supabase."

**Résultat attendu :**
- Google OAuth activé dans Supabase
- Redirect URIs configurés correctement

---

### Étape 5 : Lancer le Serveur de Développement (1 minute)

**Ce que vous faites :**
1. Dans votre terminal, assurez-vous d'être à la racine du projet
2. Vérifiez que votre fichier `.env.local` est bien configuré
3. Exécutez : `npm run dev`

**Ce que vous dites :**
> "Maintenant, lançons le serveur de développement. Je vérifie que toutes mes variables d'environnement sont configurées, puis j'exécute npm run dev."

**Résultat attendu :**
- Le serveur démarre sur `http://localhost:3000`
- Aucune erreur dans le terminal
- Message : "Ready - started server on 0.0.0.0:3000"

---

### Étape 6 : Vérifier le Fonctionnement (3 minutes)

**Ce que vous faites :**

**6.1. Tester la page d'accueil**
1. Ouvrez [http://localhost:3000](http://localhost:3000)
2. Vérifiez que la page s'affiche correctement
3. Vérifiez que les destinations s'affichent (si vous avez des données)

**6.2. Tester le blog**
1. Cliquez sur "Blog" dans le menu
2. Vérifiez que les articles s'affichent
3. Cliquez sur un article pour voir la page détaillée

**6.3. Tester le formulaire de contact**
1. Cliquez sur "Contact" dans le menu
2. Remplissez le formulaire :
   - Nom : "Test User"
   - Email : "test@example.com"
   - Message : "Message de test"
3. Cliquez sur "Envoyer le message"
4. Vérifiez le message de succès
5. Dans Supabase, allez dans **Table Editor** > **contact_messages**
6. Vérifiez que votre message a été enregistré

**6.4. Tester l'authentification Google**
1. Cliquez sur "Connexion" dans le header (ou allez sur `/login`)
2. Cliquez sur "Se connecter avec Google"
3. Connectez-vous avec votre compte Google
4. Vérifiez que vous êtes redirigé vers `/dashboard`
5. Vérifiez que votre profil s'affiche

**Ce que vous dites :**
> "Testons maintenant le site ! Je vérifie que la page d'accueil fonctionne, je teste le blog, j'envoie un message de contact, et je teste la connexion Google OAuth."

**Résultat attendu :**
- ✅ Page d'accueil fonctionne
- ✅ Blog fonctionne
- ✅ Formulaire de contact fonctionne (message enregistré dans Supabase)
- ✅ Authentification Google fonctionne (redirection vers dashboard)

---

### Étape 7 : Résolution des Problèmes (si nécessaire)

**Problèmes courants et solutions :**

**Problème 1 : "Variables d'environnement Supabase manquantes"**
- **Vérification** : Ouvrez `.env.local` et vérifiez que les variables commencent par `NEXT_PUBLIC_`
- **Solution** : Ajoutez les variables manquantes

**Problème 2 : "Erreur lors de la récupération des destinations"**
- **Vérification** : Dans Supabase **Table Editor**, vérifiez que la table `destinations` existe et contient des données
- **Solution** : Réexécutez le script SQL `supabase/seed.sql`

**Problème 3 : "OAuth callback failed"**
- **Vérification** : Dans Google Cloud Console, vérifiez que les redirect URIs incluent :
  - `http://localhost:3000/auth/callback`
  - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
- **Solution** : Ajoutez les redirect URIs manquants

**Problème 4 : Les images ne s'affichent pas**
- **Vérification** : Vérifiez que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` est configuré
- **Solution** : Configurez le Cloud name dans `.env.local`

**Ce que vous dites :**
> "Si vous rencontrez des erreurs, voici les solutions les plus courantes. Vérifiez toujours vos variables d'environnement et vos configurations dans Supabase et Google Cloud Console."

---

### Étape 8 : Déploiement (optionnel - 5 minutes)

**Ce que vous faites :**

**8.1. Préparer pour le déploiement**
1. Assurez-vous que votre code est sur GitHub
2. Créez un compte sur [Vercel](https://vercel.com) si nécessaire

**8.2. Déployer sur Vercel**
1. Connectez votre compte GitHub à Vercel
2. Cliquez sur "Import Project"
3. Sélectionnez votre repository
4. Configurez les variables d'environnement dans Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_SITE_URL` (votre URL Vercel)
5. Cliquez sur "Deploy"

**8.3. Mettre à jour les redirect URIs**
1. Dans Google Cloud Console, ajoutez votre URL Vercel dans les redirect URIs
2. Dans Supabase, mettez à jour l'URL si nécessaire

**Ce que vous dites :**
> "Pour déployer en production, je vais utiliser Vercel. Je connecte mon repository GitHub, configure les variables d'environnement, et je déploie. N'oubliez pas de mettre à jour les redirect URIs OAuth avec votre URL de production."

**Résultat attendu :**
- ✅ Site déployé sur Vercel
- ✅ Variables d'environnement configurées
- ✅ OAuth fonctionne en production

---

## ✅ Checklist Finale

Avant de considérer la configuration comme terminée, vérifiez :

- [ ] Toutes les variables d'environnement sont configurées dans `.env.local`
- [ ] Les tables Supabase existent et contiennent des données
- [ ] Cloudinary est configuré
- [ ] Google OAuth est configuré dans Supabase et Google Cloud Console
- [ ] Le serveur de développement fonctionne sans erreur
- [ ] La page d'accueil s'affiche correctement
- [ ] Le blog fonctionne et affiche des articles
- [ ] Le formulaire de contact fonctionne et enregistre les messages
- [ ] L'authentification Google fonctionne
- [ ] Le dashboard protégé est accessible après connexion

---

## 🎬 Conclusion

**Ce que vous dites :**
> "Félicitations ! Votre site Globe Trekker est maintenant configuré et fonctionnel. Vous pouvez maintenant personnaliser le contenu, ajouter vos propres destinations et articles, et déployer en production. Bonne continuation !"

---

**Durée totale estimée : 20-30 minutes**

**Note :** Si vous suivez ce script pour créer une vidéo, n'hésitez pas à ralentir ou accélérer selon votre rythme. Montrez clairement chaque étape à l'écran pour que vos spectateurs puissent suivre facilement.

