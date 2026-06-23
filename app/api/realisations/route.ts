import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { toPublicRealisation } from '@/lib/realisations-map';

export const dynamic = 'force-dynamic';

export async function GET() {
  const realisations = await prisma.realisation.findMany({
    include: { media: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(realisations.map(toPublicRealisation));
}
