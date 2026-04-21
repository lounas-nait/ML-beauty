# 📖 Instructions - MLbeauty

## 🎯 Ce que vous avez reçu

Un site web **COMPLET et PROFESSIONNEL** pour une prothésiste ongulaire à domicile avec :

✅ 4 pages (Accueil, Services, Galerie, Contact)  
✅ Design élégant (rose, nude, blanc)  
✅ Responsive (fonctionne sur tous les appareils)  
✅ TypeScript (code sans erreurs)  
✅ Système de réservation (Calendly)  
✅ Prêt pour la production  

## ⚡ QUICKSTART (5 MINUTES)

### Étape 1 : Installer

```bash
npm install
```

### Étape 2 : Tester localement

```bash
npm run dev
```

Visitez [http://localhost:3000](http://localhost:3000) - Le site fonctionne ! 🎉

### Étape 3 : Personnaliser (TRÈS IMPORTANT)

**Remplacer le lien Calendly partout** :

1. Dans VS Code : `Ctrl+Shift+F` (ou `Cmd+Shift+F` sur Mac)
2. Chercher : `calendly.com/votre-lien`
3. Remplacer par : `https://calendly.com/VOTRE_USERNAME` (ou votre vrai lien)
4. Cliquer "Replace All" (Remplacer tout)

**Mettre à jour vos coordonnées** :

1. Ouvrir : `app/contact/page.tsx`
2. Chercher et remplacer :
   - `+33612345678` → Votre téléphone
   - `contact@nailsbeauty.com` → Votre email
   - `https://wa.me/33612345678` → Votre lien WhatsApp
   - `@nails_beauty_paris` → Votre username Instagram

**C'est tout pour la personnalisation ! ✅**

### Étape 4 : Vérifier avant de deployer

```bash
npm run type-check
```

Aucune erreur TypeScript ne doit s'afficher.

### Étape 5 : Builder

```bash
npm run build
npm run start
```

Testez à nouveau sur [http://localhost:3000](http://localhost:3000)

## 🚀 DEPLOYER SUR VERCEL (PRODUCTION)

### Méthode Facile avec CLI (2 min)

**Première fois seulement** :
```bash
npm i -g vercel
vercel login
```

**Ensuite** :
```bash
vercel
```

Répondez Y aux questions, laissez les valeurs par défaut.

**Voilà ! Votre site est LIVE ! 🎉**

Vous obtiendrez une URL style : `https://nails-beauty.vercel.app`

### Méthode Facile avec GitHub (Plus pour les mises à jour)

**D'abord, créer un repo GitHub** :

1. Allez sur [github.com/new](https://github.com/new)
2. Créez un nouveau repository : `ML-beauty`
3. Ne pas initialiser de README

**Ensuite, pousser le code** :

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/ML-beauty.git
git branch -M main
git push -u origin main
```

**Finalement, connecter à Vercel** :

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez "New Project"
3. Cliquez "Import Git Repository"
4. Sélectionnez votre repo GitHub
5. Cliquez "Deploy"

**Vercel va automatiquement deployer et redéployer à chaque fois que vous faites `git push` ! 🚀**

## 📋 TOUR DU SITE

### La Page d'Accueil (`/`)

- **Hero Section** : Titre principal avec 2 boutons CTA
- **Services Preview** : 4 services en aperçu
- **Galerie** : 8 images de portfolio
- **Témoignages** : 3 avis 5 étoiles
- **CTA** : Dernier appel à réserver

### La Page Prestations (`/services`)

- **Détail complet** : 6 prestations avec prix
- **Informations pratiques** : Durée, zones, paiement
- **FAQ** : 6 questions répondues

### La Page Galerie (`/gallery`)

- **Portfolio complet** : 12 images de nail art
- **Filtrage** : Par catégories (Gel, Nail Art, etc.)
- **Lightbox** : Cliquer sur une image pour la voir en grand

### La Page Contact (`/contact`)

- **Formulaire** : Formulaire de contact
- **Infos** : Téléphone, email, WhatsApp, Instagram
- **FAQ** : Questions fréquentes
- **Zone** : Zone de déplacement

## 🎨 PERSONNALIZATION AVANCÉE

### Changer les Couleurs

Editez `tailwind.config.ts` pour modifier la palette de couleurs rose/nude.

### Ajouter vos Images

1. Créez `/public/images/`
2. Mettez-y vos photos JPG/PNG  
3. Remplacez les URLs Unsplash dans le code

### Ajouter plus de Services/Témoignages

Éditez le fichier `lib/constants.ts` - les données y sont centralisées.

## ✅ AVANT DE PARTAGER

- [ ] Calendly remplacé partout
- [ ] Coordonnées mises à jour
- [ ] Pas d'erreurs TypeScript : `npm run type-check`
- [ ] Tous les liens fonctionnent
- [ ] Responsive sur mobile (F12 → Mode mobile)
- [ ] Pages chargent vite

## 🔄 METTRE A JOUR LE SITE

### Si vous utilisez GitHub

```bash
# Faire les modifications
# Ensuite :
git add .
git commit -m "Description du changement"
git push origin main

# Et voilà ! Vercel redeploy automatiquement
```

### Sans GitHub

```bash
vercel --prod
```

## 🆘 AIDE & TROUBLESHOOTING

### Port 3000 déjà utilisé

```bash
npm run dev -- -p 3001
```

### Erreurs TypeScript

```bash
npm run type-check
```

Lisez les messages d'erreur et corrigez.

### Build échoue sur Vercel

1. Testez localement : `npm run build`
2. Corrigez les erreurs
3. Re-pushez ou re-deployer

### Images trop lentes

Réduisez la taille des images (JPG compressé, pas PNG lourd).

## 📚 FICHIERS IMPORTANTS

| Fichier | Utilité |
|---------|---------|
| `app/page.tsx` | Page d'accueil |
| `app/services/page.tsx` | Page services |
| `app/gallery/page.tsx` | Page galerie |
| `app/contact/page.tsx` | Page contact + infos |
| `components/Navbar.tsx` | Menu (lien Calendly) |
| `components/Footer.tsx` | Footer (liens sociaux) |
| `lib/constants.ts` | Toutes les données |
| `README.md` | Documentation complète |
| `DEPLOYMENT.md` | Guide déploiement détaillé |

## 📖 DOCUMENTATION COMPLÈTE

Pour plus de détails :

- **README.md** : Documentation complète
- **DEPLOYMENT.md** : Guide de déploiement détaillé
- **QUICK_START.md** : Démarrage rapide
- **PROJECT_SUMMARY.md** : Résumé du projet

## 🎉 RÉSUMÉ

Vous avez un site **production-ready** qui ne demande que :

1. **Remplacer Calendly** (important !)
2. **Personnaliser les coordonnées**
3. **Déployer sur Vercel** (2 touches !)

**C'est tout ! Le site est prêt à recevoir des réservations. 💅✨**

---

**Des questions ?** Consultez [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

**Bonne chance ! 🚀**
