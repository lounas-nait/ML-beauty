# 🎯 3 Étapes Pour Mettre le Site en Ligne

## ✅ Étape 1 : Installer & Tester (2 min)

```bash
# Terminal - dans le dossier du projet
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) - **Le site marche ! ✅**

Appuyez sur `Ctrl+C` pour arrêter.

---

## ✅ Étape 2 : Personnaliser (5 min)

**A. Remplacer le lien Calendly** (TRÈS IMPORTANT)

1. Appuyez sur `Ctrl+Shift+F` dans VS Code
2. Cherchez : `calendly.com/votre-lien`
3. Remplacez par : `https://calendly.com/VOTRE_VRAI_LIEN`
4. Cliquez "Replace All"

**B. Mettre à jour vos infos**

Ouvrez `app/contact/page.tsx` et remplacez :
- `+33612345678` → Votre tél
- `contact@nailsbeauty.com` → Votre email
- `https://wa.me/33612345678` → Votre lien WhatsApp
- `@nails_beauty_paris` → Votre Instagram

**C'est tout ! ✅**

---

## ✅ Étape 3 : Deployer sur Vercel (2 min)

Choisissez **A** ou **B** :

### A. Via CLI (+ Rapide)

```bash
# Une seule fois :
npm i -g vercel
vercel login

# Ensuite :
vercel
```

Répondez **Y** aux questions, laissez les défauts.

**Voilà ! Votre site est LIVE ! 🎉**

### B. Via GitHub (+ Facile pour les updates)

```bash
# Créer un repo GitHub d'abord (sur github.com/new)
# Ensuite :

git add .
git commit -m "Initial"
git remote add origin https://github.com/VOTRE-USERNAME/ML-beauty.git
git push -u origin main

# Puis sur vercel.com → New Project → Import GitHub
# Et c'est deployer automatiquement !
```

---

## 🎉 C'EST FAIT !

Vous avez maintenant un **site professionnel, moderne et complet** pour une prothésiste ongulaire.

**Prochaines actions** :
1. Vérifiez que le site charge correctement
2. Testez les boutons "Réserver"
3. Partagez le lien sur Instagram/WhatsApp

---

**Félicitations ! 💅✨**

Pour plus d'infos, consultez [INSTRUCTIONS.md](./INSTRUCTIONS.md) ou [DEPLOYMENT.md](./DEPLOYMENT.md).
