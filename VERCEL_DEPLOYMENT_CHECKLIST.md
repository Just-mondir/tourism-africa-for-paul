# ✅ Checklist de Déploiement Vercel

## 📋 Vue d'ensemble

Ce document liste tous les éléments nécessaires et manquants pour déployer le projet sur Vercel.

## ✅ Ce qui est déjà en place

### Configuration du projet
- ✅ `package.json` avec toutes les dépendances
- ✅ `next.config.js` configuré avec les domaines d'images autorisés
- ✅ `tsconfig.json` correctement configuré
- ✅ `.gitignore` inclut `.env.local` et `.vercel`
- ✅ Build fonctionne (`npm run build` réussit)
- ✅ Middleware configuré pour la protection des routes
- ✅ Configuration ESLint (avec règles ajustées)

### Structure du projet
- ✅ App Router Next.js 14 configuré
- ✅ Routes API (`/auth/callback`, `/logout`)
- ✅ Pages principales (home, blog, destinations, directory, contact, about, login, dashboard)
- ✅ Composants React réutilisables
- ✅ Intégration Supabase (client et serveur)
- ✅ Intégration Cloudinary

## ⚠️ Ce qui doit être fait AVANT le déploiement

### 1. Variables d'environnement sur Vercel

**CRITIQUE** : Vous devez configurer ces variables dans les paramètres du projet Vercel :

```
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name_cloudinary
NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
```

**Comment faire :**
1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez chaque variable pour **Production**, **Preview**, et **Development**

### 2. Configuration OAuth Google

**IMPORTANT** : Mettez à jour les URLs de redirection OAuth :

1. **Dans Google Cloud Console :**
   - Allez dans **APIs & Services** > **Credentials**
   - Modifiez votre OAuth 2.0 Client ID
   - Ajoutez dans **Authorized redirect URIs** :
     - `https://votre-site.vercel.app/auth/callback`
     - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

2. **Dans Supabase :**
   - Vérifiez que les identifiants Google OAuth sont corrects
   - L'URL de callback Supabase est automatique, pas besoin de la modifier

### 3. Configuration des métadonnées Open Graph

**RECOMMANDÉ** : Ajoutez `metadataBase` dans `src/app/layout.tsx` pour les images Open Graph.

Actuellement, il y a un avertissement lors du build :
```
⚠ metadataBase property in metadata export is not set
```

**Solution :** Ajoutez dans `src/app/layout.tsx` :
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-site.vercel.app'),
  // ... reste de la configuration
}
```

### 4. Images Open Graph manquantes

**OPTIONNEL mais RECOMMANDÉ** : Créez des images pour les réseaux sociaux :
- `/public/og-image.jpg` (1200x630px) - pour Open Graph
- Image Twitter (si différente)

Actuellement, le code référence `/og-image.jpg` qui n'existe peut-être pas.

### 5. Base de données Supabase

**VÉRIFIER** : Assurez-vous que :
- ✅ Les tables existent dans Supabase
- ✅ Les données sont présentes (destinations, posts, businesses, etc.)
- ✅ Les politiques RLS (Row Level Security) sont configurées si nécessaire
- ✅ Les migrations sont à jour

### 6. Configuration du domaine personnalisé (optionnel)

Si vous avez un domaine personnalisé :
1. Allez dans **Settings** > **Domains** sur Vercel
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions Vercel
4. Mettez à jour `NEXT_PUBLIC_SITE_URL` avec votre domaine

## 📝 Étapes de déploiement

### Étape 1 : Préparer le repository Git

```bash
# Vérifier que tout est commité
git status

# Si nécessaire, commit les changements
git add .
git commit -m "Préparation pour déploiement Vercel"
git push origin main
```

### Étape 2 : Importer le projet sur Vercel

1. Allez sur [Vercel](https://vercel.com)
2. Cliquez sur **Add New Project**
3. Importez votre repository GitHub/GitLab/Bitbucket
4. Vercel détectera automatiquement Next.js

### Étape 3 : Configurer les variables d'environnement

Dans l'interface de déploiement Vercel :
1. Ajoutez toutes les variables d'environnement listées ci-dessus
2. Vérifiez qu'elles sont activées pour **Production**, **Preview**, et **Development**

### Étape 4 : Déployer

1. Cliquez sur **Deploy**
2. Attendez la fin du build
3. Vérifiez les logs pour détecter d'éventuelles erreurs

### Étape 5 : Tester après déploiement

Testez ces fonctionnalités :
- ✅ Page d'accueil charge correctement
- ✅ Navigation fonctionne
- ✅ Images s'affichent (Cloudinary)
- ✅ Connexion Google OAuth fonctionne
- ✅ Dashboard accessible après connexion
- ✅ Formulaire de contact fonctionne
- ✅ Blog et destinations se chargent

## 🔧 Problèmes potentiels et solutions

### Erreur : "Variables d'environnement manquantes"
**Solution** : Vérifiez que toutes les variables `NEXT_PUBLIC_*` sont configurées sur Vercel.

### Erreur : "OAuth callback failed"
**Solution** : 
- Vérifiez que l'URL de callback Vercel est dans Google Cloud Console
- Vérifiez que `NEXT_PUBLIC_SITE_URL` est correct

### Erreur : "Images ne s'affichent pas"
**Solution** :
- Vérifiez `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Vérifiez que les URLs Cloudinary dans la base de données sont valides
- Vérifiez `next.config.js` pour les domaines autorisés

### Erreur : "Build failed"
**Solution** :
- Vérifiez les logs de build sur Vercel
- Testez le build localement : `npm run build`
- Vérifiez que toutes les dépendances sont dans `package.json`

### Erreur : "Database connection failed"
**Solution** :
- Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Vérifiez que votre projet Supabase est actif
- Vérifiez les politiques RLS si nécessaire

## 📊 Checklist finale avant déploiement

- [ ] Repository Git est à jour et pushé
- [ ] Variables d'environnement configurées sur Vercel
- [ ] URLs OAuth Google mises à jour avec l'URL Vercel
- [ ] Base de données Supabase contient des données
- [ ] Build local fonctionne : `npm run build`
- [ ] Tests locaux passent : `npm test` (si applicable)
- [ ] Images Open Graph créées (optionnel)
- [ ] `metadataBase` ajouté dans layout.tsx (recommandé)
- [ ] Domaine personnalisé configuré (si applicable)

## 🚀 Après le déploiement

1. **Tester toutes les fonctionnalités** sur l'URL de production
2. **Configurer les analytics** (Vercel Analytics, Google Analytics, etc.)
3. **Configurer le monitoring** (Sentry, LogRocket, etc.)
4. **Mettre en place les backups** de la base de données
5. **Documenter l'URL de production** pour l'équipe

## 📚 Ressources utiles

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Cloudinary](https://cloudinary.com/documentation)

---

**Note** : Ce projet est maintenant prêt pour le déploiement sur Vercel après avoir configuré les variables d'environnement et mis à jour les URLs OAuth.

