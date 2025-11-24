# 🌍 Globe Trekker - Site Web de Voyage

Site web de voyage moderne et production-ready construit avec **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Supabase** et **Cloudinary**.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Base de données](#-base-de-données)
- [Authentification Google OAuth](#-authentification-google-oauth)
- [Déploiement](#-déploiement)
- [Guide du développeur](#-guide-du-développeur)
- [Tests](#-tests)
- [Résolution de problèmes](#-résolution-de-problèmes)

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** avec section hero, destinations populaires et derniers articles
- 📝 **Blog** avec liste paginée et pages d'articles individuelles
- 📧 **Formulaire de contact** avec validation et envoi vers Supabase
- 🔐 **Authentification Google OAuth** via Supabase Auth
- 👤 **Tableau de bord** protégé pour les utilisateurs connectés
- 🎨 **Animations fluides** avec Framer Motion
- 📱 **Design responsive** adapté à tous les écrans
- 🖼️ **Images optimisées** avec Cloudinary et Next.js Image
- ♿ **Accessible** avec support clavier et ARIA
- 🔍 **SEO optimisé** avec métadonnées et Open Graph

## 🛠 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **Supabase** - Base de données et authentification
- **Cloudinary** - Gestion des images
- **Jest & React Testing Library** - Tests
- **ESLint & Prettier** - Qualité de code

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Node.js** 18.17 ou supérieur
- **npm** ou **yarn** ou **pnpm**
- Un compte **Supabase** ([inscription gratuite](https://supabase.com))
- Un compte **Cloudinary** ([inscription gratuite](https://cloudinary.com))
- Un compte **Google Cloud Console** pour OAuth ([tutoriel ci-dessous](#-authentification-google-oauth))

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <votre-repo-url>
cd website-project
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

Puis remplissez les valeurs (voir section [Configuration](#-configuration) ci-dessous).

### 4. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

# Configuration Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""

# URL du site (optionnel, pour les callbacks OAuth)
NEXT_PUBLIC_SITE_URL=""
```

### 📍 Où trouver ces valeurs ?

#### Supabase

1. Connectez-vous à [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet (ou créez-en un)
3. Allez dans **Settings** > **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Cloudinary

1. Connectez-vous à [Cloudinary Console](https://cloudinary.com/console)
2. Dans le **Dashboard**, copiez :
   - **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## 💾 Base de données

### Créer les tables dans Supabase

1. Allez dans **SQL Editor** de votre projet Supabase
2. Exécutez le script `supabase/seed.sql` pour créer les tables et insérer des données d'exemple

Les tables créées :
- `countries` - Pays
- `destinations` - Destinations de voyage
- `posts` - Articles de blog
- `contact_messages` - Messages du formulaire de contact

### Structure des tables

#### `destinations`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | VARCHAR | Nom de la destination |
| `slug` | VARCHAR | Slug unique (pour URL) |
| `description` | TEXT | Description |
| `image_url` | TEXT | URL Cloudinary de l'image |
| `country_id` | UUID | ID du pays (foreign key) |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |
| `metadata` | JSONB | Métadonnées additionnelles |

#### `countries`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | VARCHAR | Nom du pays |
| `slug` | VARCHAR | Slug unique |
| `description` | TEXT | Description |
| `image_url` | TEXT | URL Cloudinary de l'image |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |
| `metadata` | JSONB | Métadonnées additionnelles |

#### `posts`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `title` | VARCHAR | Titre de l'article |
| `slug` | VARCHAR | Slug unique |
| `excerpt` | TEXT | Extrait |
| `content` | TEXT | Contenu HTML |
| `cover_image_url` | TEXT | URL Cloudinary de l'image de couverture |
| `published_at` | TIMESTAMP | Date de publication (NULL = brouillon) |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |
| `author_id` | UUID | ID de l'auteur (optionnel) |
| `metadata` | JSONB | Métadonnées additionnelles |

#### `contact_messages`

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `name` | VARCHAR | Nom de l'expéditeur |
| `email` | VARCHAR | Email de l'expéditeur |
| `message` | TEXT | Message |
| `created_at` | TIMESTAMP | Date de création |
| `read` | BOOLEAN | Message lu ou non |

### Ajouter des données d'exemple

Le script `supabase/seed.sql` inclut des données d'exemple. **Important** : Remplacez `YOUR_CLOUD_NAME` par votre nom de cloud Cloudinary dans les URLs d'images.

## 🔐 Authentification Google OAuth

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez l'API **Google+ API**

### 2. Créer des identifiants OAuth

1. Allez dans **APIs & Services** > **Credentials**
2. Cliquez sur **Create Credentials** > **OAuth client ID**
3. Configurez l'écran de consentement OAuth si nécessaire
4. Sélectionnez **Web application**
5. Configurez les **Authorized redirect URIs** :
   - Développement local : `http://localhost:3000/auth/callback`
   - Production : `https://votre-site.vercel.app/auth/callback`
   - **Important** : Ajoutez aussi l'URL de callback Supabase : `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
6. Copiez le **Client ID** et le **Client Secret**

### 3. Configurer Supabase

1. Allez dans **Authentication** > **Providers** dans votre projet Supabase
2. Activez **Google**
3. Collez votre **Client ID** et **Client Secret** Google
4. Cliquez sur **Save**

### 4. Tester la connexion

1. Lancez le serveur de développement : `npm run dev`
2. Allez sur [http://localhost:3000/login](http://localhost:3000/login)
3. Cliquez sur "Se connecter avec Google"
4. Après connexion, vous serez redirigé vers `/dashboard`

## 🚀 Déploiement

### Déployer sur Vercel (recommandé)

1. **Pousser votre code sur GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Importer le projet sur Vercel**

   - Allez sur [Vercel](https://vercel.com)
   - Connectez votre compte GitHub
   - Cliquez sur **Import Project**
   - Sélectionnez votre repository

3. **Configurer les variables d'environnement**

   Dans les paramètres du projet Vercel, ajoutez toutes les variables de `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_SITE_URL` (votre URL Vercel, ex: `https://votre-site.vercel.app`)

4. **Mettre à jour les URLs de callback OAuth**

   - Dans Google Cloud Console, ajoutez votre URL Vercel dans les redirect URIs
   - Dans Supabase, mettez à jour l'URL de callback si nécessaire

5. **Déployer**

   Vercel déploie automatiquement à chaque push sur la branche `main`.

### Build de production local

```bash
npm run build
npm run start
```

## 👨‍💻 Guide du développeur

### Structure du projet

```
website-project/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── contact/            # Page contact
│   │   ├── blog/               # Pages blog
│   │   ├── login/              # Page login
│   │   ├── dashboard/          # Page dashboard (protégée)
│   │   └── auth/               # Routes d'authentification
│   ├── components/             # Composants React réutilisables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── DestinationCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── AuthButton.tsx
│   │   ├── Modal.tsx
│   │   └── Loader.tsx
│   ├── lib/                    # Utilitaires et helpers
│   │   ├── supabase/           # Client Supabase et queries
│   │   ├── cloudinary.ts       # Helpers Cloudinary
│   │   └── utils.ts            # Utilitaires généraux
│   ├── types/                  # Types TypeScript
│   │   ├── destination.ts
│   │   ├── country.ts
│   │   ├── post.ts
│   │   └── user.ts
│   └── styles/
│       └── globals.css         # Styles globaux
├── supabase/
│   └── seed.sql                # Script SQL de seed
├── jest.config.js              # Configuration Jest
├── jest.setup.js               # Setup Jest
├── tailwind.config.ts          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── next.config.js              # Configuration Next.js
└── package.json                # Dépendances
```

### Comment modifier...

#### 🎨 Couleurs du thème

1. Ouvrez `tailwind.config.ts`
2. Modifiez les couleurs dans la section `theme.extend.colors`
3. Ou modifiez les variables CSS dans `src/app/globals.css`

```typescript
// tailwind.config.ts
colors: {
  primary: {
    500: "#f97316", // Orange principal - changez cette valeur
    // ...
  },
}
```

#### 🖼️ Logo du header

1. Remplacez le texte "GLOBE TREKKER" dans `src/components/Header.tsx`
2. Ou ajoutez une image :

```tsx
<Link href="/">
  <Image src="/logo.png" alt="Globe Trekker" width={150} height={50} />
</Link>
```

#### 🎭 Image de la section hero

1. Modifiez la section hero dans `src/components/Hero.tsx`
2. Ajoutez une image de fond ou modifiez le gradient

#### ➕ Ajouter une nouvelle page

1. Créez un nouveau dossier dans `src/app/`
2. Créez un fichier `page.tsx` :

```tsx
// src/app/ma-page/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma Page - Globe Trekker",
};

export default function MaPage() {
  return (
    <div className="section-spacing">
      <div className="container-custom">
        <h1>Ma Page</h1>
      </div>
    </div>
  );
}
```

3. Ajoutez le lien dans `src/components/Header.tsx`

#### 📊 Ajouter de nouveaux champs depuis Supabase

1. Modifiez les types dans `src/types/` :

```typescript
// src/types/destination.ts
export interface Destination {
  // ... champs existants
  rating?: number; // Nouveau champ
  price?: number; // Nouveau champ
}
```

2. Mettez à jour les requêtes dans `src/lib/supabase/queries.ts` pour inclure les nouveaux champs
3. Utilisez les nouveaux champs dans vos composants

#### 🖼️ Modifier les transformations Cloudinary

1. Ouvrez `src/lib/cloudinary.ts`
2. Modifiez les fonctions `transformCloudinaryUrl()` ou créez de nouvelles fonctions
3. Utilisez-les dans vos composants :

```tsx
import { getOptimizedImageUrl } from "@/lib/cloudinary";

const imageUrl = getOptimizedImageUrl(destination.image_url, 800, 600);
```

#### 🔑 Changer les identifiants OAuth Google

1. Dans Supabase : **Authentication** > **Providers** > **Google**
2. Mettez à jour le **Client ID** et **Client Secret**
3. Assurez-vous que les redirect URIs sont corrects dans Google Cloud Console

### Ajouter un nouveau composant

1. Créez un fichier dans `src/components/` : `MonComposant.tsx`

```tsx
// src/components/MonComposant.tsx
interface MonComposantProps {
  title: string;
}

export default function MonComposant({ title }: MonComposantProps) {
  return <div>{title}</div>;
}
```

2. Importez et utilisez-le dans vos pages

## 🧪 Tests

### Lancer les tests

```bash
npm test
# ou
yarn test
# ou
pnpm test
```

### Lancer les tests en mode watch

```bash
npm run test:watch
```

### Ajouter un nouveau test

1. Créez un fichier `*.test.tsx` à côté de votre composant ou dans `__tests__/`
2. Utilisez Jest et React Testing Library :

```tsx
import { render, screen } from "@testing-library/react";
import MonComposant from "../MonComposant";

describe("MonComposant", () => {
  it("renders correctly", () => {
    render(<MonComposant title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## 🔧 Résolution de problèmes

### Erreur : "Variables d'environnement Supabase manquantes"

**Solution** : Vérifiez que votre fichier `.env.local` contient bien `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Erreur : "Erreur lors de la récupération des destinations"

**Solutions** :
1. Vérifiez votre connexion à Supabase
2. Assurez-vous que les tables existent dans Supabase
3. Vérifiez que les noms de colonnes correspondent aux types TypeScript
4. Consultez les logs dans la console du navigateur

### Erreur : "OAuth callback failed"

**Solutions** :
1. Vérifiez que les redirect URIs sont correctement configurés dans Google Cloud Console
2. Ajoutez l'URL Supabase callback : `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
3. Vérifiez que les identifiants Google sont corrects dans Supabase

### Les images ne s'affichent pas

**Solutions** :
1. Vérifiez que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` est configuré
2. Vérifiez que les URLs Cloudinary dans la base de données sont valides
3. Consultez la configuration dans `next.config.js` pour les domaines autorisés

### Erreur de build

**Solutions** :
1. Vérifiez les erreurs TypeScript : `npm run build`
2. Vérifiez que toutes les dépendances sont installées : `npm install`
3. Supprimez `.next` et `node_modules`, puis réinstallez

### Page 404 pour les articles de blog

**Solutions** :
1. Vérifiez que les slugs dans la base de données sont corrects
2. Vérifiez que la fonction `generateStaticParams()` fonctionne (ou désactivez-la pour le SSR)
3. Vérifiez les logs du serveur

## 📝 Checklist de démarrage

- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] Tables Supabase créées (exécuter `supabase/seed.sql`)
- [ ] Données d'exemple insérées dans Supabase
- [ ] Cloudinary configuré avec URLs d'images
- [ ] Google OAuth configuré dans Supabase et Google Cloud Console
- [ ] Redirect URIs configurés pour OAuth
- [ ] Serveur de développement lancé : `npm run dev`
- [ ] Site accessible sur `http://localhost:3000`
- [ ] Tests passent : `npm test`

## 📚 Ressources supplémentaires

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Cloudinary](https://cloudinary.com/documentation)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Framer Motion](https://www.framer.com/motion/)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Créé avec ❤️ pour Globe Trekker**

