import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { toPublicReview } from '@/lib/reviews-map';

export const dynamic = 'force-dynamic';

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews.map(toPublicReview));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { name, rating, comment } = body;

  if (typeof name !== 'string' || name.trim().length === 0 || name.trim().length > 80) {
    return NextResponse.json({ error: 'Le nom est invalide.' }, { status: 400 });
  }

  if (typeof comment !== 'string' || comment.trim().length === 0 || comment.trim().length > 1000) {
    return NextResponse.json({ error: "L'avis est invalide." }, { status: 400 });
  }

  const ratingNumber = Number(rating);
  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return NextResponse.json({ error: 'La note doit être comprise entre 1 et 5.' }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      name: name.trim(),
      comment: comment.trim(),
      rating: ratingNumber,
      platform: 'DIRECT',
      source: 'CLIENT',
      status: 'PENDING',
    },
  });

  return NextResponse.json(
    { id: review.id, message: 'Merci ! Votre avis sera publié après validation.' },
    { status: 201 }
  );
}
