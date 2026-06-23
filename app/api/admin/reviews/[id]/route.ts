import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const;

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);
  const status = body?.status;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 });
  }

  const review = await prisma.review.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(review);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
