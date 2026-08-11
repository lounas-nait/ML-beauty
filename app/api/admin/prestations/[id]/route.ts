import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LABEL_LENGTH = 80;
const MAX_URL_LENGTH = 500;
const MAX_FEATURE_LENGTH = 100;
const MAX_FEATURES_COUNT = 8;

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};

  if (body.title !== undefined) {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title || title.length > MAX_TITLE_LENGTH) {
      return NextResponse.json({ error: 'Le titre est invalide.' }, { status: 400 });
    }
    updateData.title = title;
  }

  if (body.description !== undefined) {
    const description = body.description === null ? null : String(body.description).trim();
    if (description !== null && description.length > MAX_DESCRIPTION_LENGTH) {
      return NextResponse.json({ error: 'La description est trop longue.' }, { status: 400 });
    }
    updateData.description = description;
  }

  if (body.price !== undefined) {
    const price = typeof body.price === 'number' ? body.price : Number(body.price);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: 'Le prix est invalide.' }, { status: 400 });
    }
    updateData.price = price;
  }

  if (body.priceLabel !== undefined) {
    const priceLabel = body.priceLabel === null ? null : String(body.priceLabel).trim();
    if (priceLabel !== null && priceLabel.length > MAX_LABEL_LENGTH) {
      return NextResponse.json({ error: 'Le libellé de prix est trop long.' }, { status: 400 });
    }
    updateData.priceLabel = priceLabel;
  }

  if (body.icon !== undefined) {
    const icon = body.icon === null ? null : String(body.icon).trim();
    if (icon !== null && icon.length > MAX_LABEL_LENGTH) {
      return NextResponse.json({ error: 'L’icône est trop longue.' }, { status: 400 });
    }
    updateData.icon = icon;
  }

  if (body.bookingUrl !== undefined) {
    const bookingUrl = body.bookingUrl === null ? null : String(body.bookingUrl).trim();
    if (bookingUrl !== null && bookingUrl.length > MAX_URL_LENGTH) {
      return NextResponse.json({ error: 'L’URL de réservation est trop longue.' }, { status: 400 });
    }
    updateData.bookingUrl = bookingUrl;
  }

  if (body.imageUrl !== undefined) {
    const imageUrl = body.imageUrl === null ? null : String(body.imageUrl).trim();
    if (imageUrl !== null && imageUrl.length > MAX_URL_LENGTH) {
      return NextResponse.json({ error: 'L’URL de l’image est trop longue.' }, { status: 400 });
    }
    updateData.imageUrl = imageUrl;
  }

  if (body.isPromo !== undefined) {
    updateData.isPromo = Boolean(body.isPromo);
    if (!body.isPromo) {
      updateData.promoPrice = null;
      updateData.promoLabel = null;
    }
  }

  if (body.promoPrice !== undefined) {
    const promoPrice = body.promoPrice === null ? null : (typeof body.promoPrice === 'number' ? body.promoPrice : Number(body.promoPrice));
    if (promoPrice !== null && (!Number.isFinite(promoPrice) || promoPrice < 0)) {
      return NextResponse.json({ error: 'Le prix promotionnel est invalide.' }, { status: 400 });
    }
    updateData.promoPrice = promoPrice;
  }

  if (body.promoLabel !== undefined) {
    const promoLabel = body.promoLabel === null ? null : String(body.promoLabel).trim();
    if (promoLabel !== null && promoLabel.length > MAX_LABEL_LENGTH) {
      return NextResponse.json({ error: 'Le libellé promo est trop long.' }, { status: 400 });
    }
    updateData.promoLabel = promoLabel;
  }

  if (body.order !== undefined) {
    const order = typeof body.order === 'number' ? body.order : Number(body.order);
    if (!Number.isInteger(order) || order < 0) {
      return NextResponse.json({ error: "L'ordre est invalide." }, { status: 400 });
    }
    updateData.order = order;
  }

  if (body.features !== undefined) {
    if (!Array.isArray(body.features)) {
      return NextResponse.json({ error: 'Les points inclus sont invalides.' }, { status: 400 });
    }
    const features = body.features
      .filter((item: unknown): item is string => typeof item === 'string')
      .map((item: string) => item.trim())
      .filter(Boolean)
      .slice(0, MAX_FEATURES_COUNT);
    if (features.some((feature: string) => feature.length > MAX_FEATURE_LENGTH)) {
      return NextResponse.json({ error: 'Un des points inclus est trop long.' }, { status: 400 });
    }
    updateData.features = features;
  }

  const updatedPrestation = await prisma.prestation.update({
    where: { id: Number(params.id) },
    data: {
      ...updateData,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updatedPrestation);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.prestation.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
