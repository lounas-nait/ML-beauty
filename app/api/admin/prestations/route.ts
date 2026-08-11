import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LABEL_LENGTH = 80;
const MAX_URL_LENGTH = 500;
const MAX_FEATURE_LENGTH = 100;
const MAX_FEATURES_COUNT = 8;

function parseFeatures(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const features = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
  return features.slice(0, MAX_FEATURES_COUNT);
}

export async function GET() {
  const prestations = await prisma.prestation.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  return NextResponse.json(prestations);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : null;
  const price = typeof body.price === 'number' ? body.price : Number(body.price);
  const priceLabel = typeof body.priceLabel === 'string' ? body.priceLabel.trim() : null;
  const icon = typeof body.icon === 'string' ? body.icon.trim() : null;
  const bookingUrl = typeof body.bookingUrl === 'string' ? body.bookingUrl.trim() : null;
  const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : null;
  const isPromo = Boolean(body.isPromo);
  const promoPrice = isPromo ? (typeof body.promoPrice === 'number' ? body.promoPrice : Number(body.promoPrice)) : null;
  const promoLabel = isPromo && typeof body.promoLabel === 'string' ? body.promoLabel.trim() : null;
  const features = parseFeatures(body.features) ?? [];

  if (!title || title.length > MAX_TITLE_LENGTH) {
    return NextResponse.json({ error: 'Le titre est invalide.' }, { status: 400 });
  }

  if (description !== null && description.length > MAX_DESCRIPTION_LENGTH) {
    return NextResponse.json({ error: 'La description est trop longue.' }, { status: 400 });
  }

  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: 'Le prix est invalide.' }, { status: 400 });
  }

  if (priceLabel !== null && priceLabel.length > MAX_LABEL_LENGTH) {
    return NextResponse.json({ error: 'Le libellé de prix est trop long.' }, { status: 400 });
  }

  if (icon !== null && icon.length > MAX_LABEL_LENGTH) {
    return NextResponse.json({ error: 'L’icône est trop longue.' }, { status: 400 });
  }

  if (bookingUrl !== null && bookingUrl.length > MAX_URL_LENGTH) {
    return NextResponse.json({ error: 'L’URL de réservation est trop longue.' }, { status: 400 });
  }

  if (imageUrl !== null && imageUrl.length > MAX_URL_LENGTH) {
    return NextResponse.json({ error: 'L’URL de l’image est trop longue.' }, { status: 400 });
  }

  if (isPromo && (promoPrice === null || !Number.isFinite(promoPrice) || promoPrice < 0)) {
    return NextResponse.json({ error: 'Le prix promotionnel est invalide.' }, { status: 400 });
  }

  if (features.some((feature) => feature.length > MAX_FEATURE_LENGTH)) {
    return NextResponse.json({ error: 'Un des points inclus est trop long.' }, { status: 400 });
  }

  const maxOrder = await prisma.prestation.aggregate({ _max: { order: true } });
  const order = (maxOrder._max.order ?? -1) + 1;

  const prestation = await prisma.prestation.create({
    data: {
      title,
      description,
      price,
      priceLabel,
      icon,
      bookingUrl,
      imageUrl,
      isPromo,
      promoPrice: isPromo ? promoPrice : null,
      promoLabel: isPromo ? promoLabel : null,
      features,
      order,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(prestation, { status: 201 });
}
