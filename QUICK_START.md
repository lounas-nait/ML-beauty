# ⚡ Quick Start Guide - MLbeauty

## 🚀 Démarrage Rapide (5 min)

### 1. Installation
```bash
npm install
```

### 2. Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000)

### 3. Personnalisation (5 min)

**Remplacer le lien Calendly** :
- `Ctrl+Shift+F` → Chercher : `calendly.com/votre-lien`
- Remplacer par votre lien Calendly

**Mettre à jour le téléphone/email** :
- Fichier : `app/contact/page.tsx`
- Chercher : `+33612345678` et `contact@nailsbeauty.com`
- Remplacer par vos infos

**Instagram/WhatsApp** :
- Fichier : `app/contact/page.tsx`
- Remplacer les liens

### 4. Vérification TypeScript
```bash
npm run type-check
```

### 5. Build & Test Production
```bash
npm run build
npm run start
```

## 📤 Déploiement sur Vercel (2 min)

### Méthode Rapide avec CLI

```bash
npm i -g vercel          # Une seule fois
vercel login             # Connectez-vous
vercel                   # Et voilà !
```

**Votre site sera live en quelques secondes ! 🎉**

### Méthode avec GitHub (Plus facile pour les updates)

```bash
git add .
git commit -m "Initial"
git push origin main     # Vercel redeploy automatiquement
```

## 📋 Commandes Importantes

```bash
npm run dev          # 🚀 Développement local
npm run build        # 📦 Build production
npm run start        # ▶️ Lancer le serveur de prod
npm run lint         # 🔍 Vérifier le code
npm run type-check   # ✔️ Vérifier TypeScript
vercel               # 🌐 Deployer sur Vercel
vercel --prod        # 🌐 Force le redeploy
```

## 📁 Structure Important

```
/app                 # Pages et layout
/components          # Composants réutilisables
/lib                 # Utilitaires et constantes
/public              # Images statiques
```

## 🎨 Personnaliser les Couleurs

Éditez `tailwind.config.ts` pour changer la palette de couleurs.

## 🖼️ Ajouter vos Images

1. Créez `/public/images/`
2. Mettez-y vos photos JPG/PNG
3. Remplacez les URLs Unsplash

## ✅ Avant de Mettre en Ligne

- [ ] Calendly remplacé partout
- [ ] Coordonnées à jour
- [ ] Pas d'erreurs TypeScript : `npm run type-check`
- [ ] Test responsive : `F12` → Mode mobile
- [ ] Tous les liens fonctionnent

## 🆘 Besoin d'Aide ?

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour le guide complet.

---

**C'est simple ! 💅✨**
