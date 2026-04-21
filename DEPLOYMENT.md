# 🚀 Guide de Déploiement Complet - MLbeauty

## Phase 1️⃣ : Préparation Locale

### Étape 1 : Installer les dépendances

```bash
cd /workspaces/ML-beauty
npm install
```

### Étape 2 : Vérifier le fonctionnement local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur. Le site doit s'afficher correctement.

### Étape 3 : Vérifier qu'il n'y a pas d'erreurs TypeScript

```bash
npm run type-check
```

Si des erreurs apparaissent, corrigez-les avant de continuer.

## Phase 2️⃣ : Personnaliser le Contenu

### Remplacer le lien Calendly

1. Ouvrez la palette de commandes : `Ctrl+Shift+F` (ou `Cmd+Shift+F` sur Mac)
2. Recherchez : `calendly.com/votre-lien`
3. Remplacez par votre vrai lien Calendly
4. Cliquez sur "Replace All" (Remplacer tout)

### Mettre à jour les coordonnées

Éditez `app/contact/page.tsx` :
- Ligne ~46 : Remplacez `+33612345678` par votre numéro
- Ligne ~54 : Remplacez `contact@nailsbeauty.com` par votre email
- Ligne ~166 : Remplacez `https://wa.me/33612345678` par votre lien WhatsApp
- Ligne ~177 : Remplacez `@nails_beauty_paris` par votre username Instagram

### Remplacer les images (Optionnel)

1. Créez un dossier `public/images/`
2. Mettez-y vos images JPG/PNG
3. Remplacez les URLs Unsplash par vos images locales

## Phase 3️⃣ : Build pour Production

```bash
npm run build
npm run start
```

Testez que tout fonctionne. Visitez [http://localhost:3000](http://localhost:3000)

## Phase 4️⃣ : Déploiement sur Vercel

### Option A : Déploiement via CLI (Recommandé - Plus rapide)

**Durée : 5 minutes** ⏱️

1. **Installer Vercel CLI** (une seule fois)
```bash
npm i -g vercel
```

2. **Se connecter**
```bash
vercel login
```

Suivez les instructions à l'écran. Cela ouvrira une page web pour vous connecter.

3. **Déployer**
```bash
vercel
```

Répondez aux questions :
- `? Set up and deploy "..."` → **Y**
- `? Which scope do you want to deploy to?` → Sélectionnez votre compte Vercel
- `? Link to existing project?` → **N** (première fois)
- `? What's your project's name?` → `nails-beauty`
- `? In which directory is your code?` → **.** (point)
- `? Want to modify these settings?` → **N**

**Voilà ! 🎉 Votre site est en ligne !**

Vous verrez une URL comme : `https://nails-beauty.vercel.app`

### Option B : Déploiement via GitHub (Automatique)

**Durée : 10 minutes**

1. **Créer un dépôt GitHub**
   - Allez sur [github.com/new](https://github.com/new)
   - Créez un repository `ML-beauty`
   - Ne pas initialiser de README

2. **Pousser le code**
```bash
git add .
git commit -m "Initial commit: MLbeauty website"
git remote add origin https://github.com/VOTRE-USERNAME/ML-beauty.git
git branch -M main
git push -u origin main
```

3. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Sélectionnez "Import Git Repository"
   - Choisissez votre repo GitHub
   - Cliquez sur "Import"

4. **Configuration automatique**
   - Vercel détecte Next.js automatiquement
   - Cliquez sur "Deploy"

**Déploiement en cours... 🚀**

Vercel va build et deployer automatiquement.

### Option C : Ajouter un Domaine Personnalisé

1. Chez Vercel, allez dans **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `nails-beauty.fr`)
4. Suivez les instructions pour configurer le DNS

## Phase 5️⃣ : Vérifier le Déploiement

✅ **Checklist finale** :

- [ ] Site accessible à votre URL Vercel
- [ ] Les pages chargent correctement
- [ ] Responsive sur mobile (ouvrir avec F12)
- [ ] Liens Calendly cliquables
- [ ] Formulaire de contact fonctionne
- [ ] Pas d'erreurs TypeScript au build
- [ ] Lighthouse score > 90 (F12 → Lighthouse)

## 🔄 Après le Déploiement : Mises à Jour

### Mettre à jour le code

**Avec GitHub** (Automatique) :
```bash
git add .
git commit -m "Description de la modification"
git push origin main
```

Vercel re-deploy automatiquement.

**Sans GitHub** :
```bash
vercel --prod
```

## 🆘 Troubleshooting

### Erreur : "Build failed"

```bash
npm run build        # Testez localement
npm run type-check   # Vérifiez TypeScript
```

Corrigez les erreurs avant de re-deployer.

### Site très lent

- Vérifiez les images (optimisez s'il y a trop de données)
- Créez un `.env.local` si vous avez des clés secrètes

### Domaine personnalisé ne fonctionne pas

1. Vérifiez la configuration DNS (15 minutes de propagation)
2. Chez Vercel, Settings → Domains → Vérifiez les enregistrements DNS
3. Attendez la validation (statut doit passer au vert)

## 📊 Marketing Après Déploiement

Votre site est live ! 🎉 Maintenant :

1. **Partagez le lien** sur :
   - 📱 Instagram Stories
   - 📱 WhatsApp Status
   - 💬 Groupes WhatsApp
   - 📧 Email de contact

2. **Optimisez le SEO** :
   - Mettez à jour les métadonnées dans `app/layout.tsx`
   - Ajoutez des photos réelles dans la galerie
   - Assurez-vous que le lien Calendly est correct

3. **Testez avant de partager** :
```bash
# Vérifier les performances
npm run build
npm run start
```

## 📚 Ressources Utiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Calendly Setup](https://calendly.com)

---

**Bravo ! 🌟 Votre site est now live et prêt à recevoir des réservations !**

Pour toute question, revisitez ce guide ou consultez la documentation officielle des outils.

**Bonne chance ! 💅✨**
