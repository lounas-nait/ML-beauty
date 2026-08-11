const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const prestations = [
  {
    title: 'Semi-Permanent main',
    description: 'Vernis semi-permanent haute tenue pour des ongles naturels renforcés',
    price: 20,
    priceLabel: null,
    icon: '💅',
    bookingUrl: '',
    imageUrl: '',
    isPromo: false,
    promoPrice: null,
    promoLabel: null,
  },
  {
    title: 'Semi-Permanent pied',
    description: 'Pose semi-permanente longue tenue pour des pieds élégants et soignés.',
    price: 30,
    priceLabel: null,
    icon: '🦶',
    bookingUrl: '',
    imageUrl: '',
    isPromo: false,
    promoPrice: null,
    promoLabel: null,
  },
  {
    title: 'Dépose Semi-Permanent',
    description: 'Retrait professionnel du vernis semi-permanent en douceur, sans abîmer l’ongle naturel',
    price: 10,
    priceLabel: 'À partir de',
    icon: '✨',
    bookingUrl: '',
    imageUrl: '',
    isPromo: false,
    promoPrice: null,
    promoLabel: null,
  }
];

async function main() {
  console.log('Seed démarré — vérification et insertion...');

  for (const p of prestations) {
    const exists = await prisma.prestation.findFirst({ where: { title: p.title } });
    if (exists) {
      console.log(`Existant — saute: ${p.title}`);
      continue;
    }

    await prisma.prestation.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        priceLabel: p.priceLabel,
        icon: p.icon,
        bookingUrl: p.bookingUrl,
        imageUrl: p.imageUrl,
        isPromo: p.isPromo,
        promoPrice: p.promoPrice,
        promoLabel: p.promoLabel,
        updatedAt: new Date(),
      },
    });

    console.log(`Inséré: ${p.title}`);
  }

  console.log('Seed terminé.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
