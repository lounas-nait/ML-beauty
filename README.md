# MLbeauty - Site de Réservation pour Prothésiste Ongulaire

Bienvenue sur le site de **MLbeauty**, un site web complet et moderne pour une prothésiste ongulaire à domicile.

## 🎯 À Propos

MLbeauty est un site vitrine professionnel permettant de :

✨ **Présenter** le service de prothésiste ongulaire

📸 **Showcaser** les réalisations grâce à une galerie interactive

📋 **Lister** les prestations disponibles (Gel, Semi-Permanent, Nail Art, etc.)

📅 **Réserver** des rendez-vous via Calendly

📱 **Rester connecté** via Instagram/WhatsApp

## 💻 Stack Technologique

- **Framework** : [Next.js 14](https://nextjs.org/) - App Router
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Déploiement** : [Vercel](https://vercel.com/)
- **Images** : Next.js Image Optimization

## 📄 Pages Disponibles

### 🏠 Accueil (`/`)
- Hero section attractif avec call-to-action
- Aperçu des services
- Galerie de dernières réalisations
- Témoignages clients (5 étoiles)
- Section avec statistiques
- Bouton CTA "Réserver"

### 💅 Prestations (`/services`)
- Détail de 6 prestations principales
- Description et prix de chaque service
- Informations pratiques (durée, zone de déplacement, modes de paiement)
- Questions fréquentes
- Boutons de réservation par service

### 🎨 Galerie (`/gallery`)
- Grid responsive 2x2 (mobile) → 4x4 (desktop)
- Filtrage par catégories
- Lightbox/modal au clic
- Images de haute qualité
- CTA pour réservation

### 📞 Contact (`/contact`)
- Formulaire de contact fonctionnel
- Informations de contact (téléphone, email)
- Liens directs WhatsApp/Instagram
- Zone de déplacement interactive
- FAQ détaillée (6 questions)

## 🚀 Installation & Démarrage

### Prérequis

- **Node.js** 18.17+ 
- **npm** ou **yarn** ou **pnpm**

### Étapes d'Installation

1. **Cloner le repository**
```bash
git clone https://github.com/lounas-nait/ML-beauty.git
cd ML-beauty
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Commandes Disponibles

```bash
# Développement
npm run dev          # Lance le serveur avec hot-reload

# Production
npm run build        # Build l'application pour la production
npm run start        # Lance le serveur de production

# Vérification
npm run lint         # Vérifie le code avec ESLint
npm run type-check   # Vérifie les types TypeScript
```

## ⚙️ Configuration & Personnalisation

### 🔗 Lien Calendly

Remplacez `https://calendly.com/votre-lien` par votre vrai lien Calendly partout dans le code :

**Fichiers à modifier** :
- `components/Navbar.tsx` 
- `app/page.tsx` 
- `app/services/page.tsx` 
- `app/gallery/page.tsx` 
- `app/contact/page.tsx` 
- `components/Footer.tsx`

**Recherche rapide** : `Ctrl+Shift+F` → "calendly.com/votre-lien" → Remplacer tout

### 📞 Coordonnées de Contact

Mettez à jour vos infos dans `app/contact/page.tsx` :
- **Téléphone** : `+33612345678`
- **Email** : `contact@nailsbeauty.com`
- **WhatsApp** : `https://wa.me/33612345678`
- **Instagram** : `@nails_beauty_paris`

### 🎨 Couleurs & Design

Les couleurs principales sont définies dans `tailwind.config.ts`. Vous pouvez facilement modifier la palette de couleurs.

### 📸 Images

Les images utilisent des placeholders de [Unsplash](https://unsplash.com/). Pour utiliser vos vraies images, uploadez-les dans `/public/images/` et mettez à jour les URLs.

## 🌐 Déploiement sur Vercel (Production)

### Méthode 1 : Deploiement via Vercel CLI (Recommandé)

1. **Installer Vercel CLI**
```bash
npm i -g vercel
```

2. **Se connecter à Vercel**
```bash
vercel login
```

3. **Déployer le projet**
```bash
vercel
```

Répondez aux questions interactives et votre site sera en ligne !

### Méthode 2 : Déploiement via GitHub (GitHub Integration)

1. **Pousser le code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquez sur "Deploy"

3. **Configuration automatique**
   - Vercel build automatiquement à chaque push
   - Vous obtiendrez un domaine Vercel (ex: `ml-beauty.vercel.app`)
   - Vous pouvez ajouter un domaine personnalisé dans les settings

### Méthode 3 : Déploiement sur un serveur personnalisé

1. **Créer un build**
```bash
npm run build
```

2. **Transférer les fichiers**
```bash
scp -r .next public package.json package-lock.json user@your-server:/app/
```

3. **Installer et lancer**
```bash
ssh user@your-server
cd /app && npm install --production
npm run start
```

## 📊 Structure du Projet

```
/ML-beauty/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles globaux
│   ├── services/
│   │   └── page.tsx            # Page prestations
│   ├── gallery/
│   │   └── page.tsx            # Page galerie
│   └── contact/
│       └── page.tsx            # Page contact
├── components/
│   ├── Navbar.tsx              # Barre de navigation
│   └── Footer.tsx              # Pied de page
├── public/                     # Assets statiques
├── package.json                # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.js              # Configuration Next.js
└── README.md                   # Ce fichier
```

## ✨ Fonctionnalités

✅ **Responsive** - Mobile-first, fonctionne sur tous les appareils

✅ **TypeScript** - Code entièrement typé

✅ **SEO** - Métadonnées, Open Graph optimisés

✅ **Performance** - Lighthouse optimisé

✅ **Galerie Interactive** - Filtrage et lightbox

✅ **Formulaire de Contact** - Validation complète

✅ **Design Moderne** - Animations et effets

✅ **Production-Ready** - Code propre et maintenable

## 📝 Checklist Avant Déploiement

- [ ] Lien Calendly remplacé partout
- [ ] Coordonnées de contact mises à jour
- [ ] Images remplacées si nécessaire
- [ ] Liens Instagram/WhatsApp corrects
- [ ] Zone de déplacement correcte
- [ ] Tests fonctionnels effectués
- [ ] Pas d'erreurs TypeScript
- [ ] Test responsive mobile
- [ ] Lighthouse score > 90

## 📧 Support

Pour toute question, utilisez le formulaire de contact sur la page `/contact`.

---

**Créé avec ❤️ en Next.js + TypeScript + Tailwind CSS**