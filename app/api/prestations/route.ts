import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const prestations = await prisma.prestation.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      priceLabel: true,
      icon: true,
      bookingUrl: true,
      imageUrl: true,
      isPromo: true,
      promoPrice: true,
      promoLabel: true,
      features: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(prestations);
}
