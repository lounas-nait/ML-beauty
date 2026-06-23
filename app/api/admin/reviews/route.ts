import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_PLATFORMS = ['GOOGLE', 'INSTAGRAM', 'TIKTOK', 'DIRECT'] as const;
const MAX_SCREENSHOT_BASE64_LENGTH = 6_000_000; // ~4.5 Mo de fichier source

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { name, rating, comment, screenshotUrl, platform } = body;

  if (typeof name !== 'string' || name.trim().length === 0 || name.trim().length > 80) {
    return NextResponse.json({ error: 'Le nom est invalide.' }, { status: 400 });
  }

  const hasComment = typeof comment === 'string' && comment.trim().length > 0;
  const hasScreenshot = typeof screenshotUrl === 'string' && screenshotUrl.trim().length > 0;

  if (!hasComment && !hasScreenshot) {
    return NextResponse.json(
      { error: 'Ajoutez un commentaire ou une capture d’écran.' },
      { status: 400 }
    );
  }

  if (hasComment && comment.trim().length > 1000) {
    return NextResponse.json({ error: "L'avis est invalide." }, { status: 400 });
  }

  if (hasScreenshot) {
    if (!screenshotUrl.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Format de capture invalide.' }, { status: 400 });
    }
    if (screenshotUrl.length > MAX_SCREENSHOT_BASE64_LENGTH) {
      return NextResponse.json({ error: 'La capture est trop volumineuse (max ~4 Mo).' }, { status: 400 });
    }
  }

  const ratingNumber = Number(rating);
  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return NextResponse.json({ error: 'La note doit être comprise entre 1 et 5.' }, { status: 400 });
  }

  const platformValue = VALID_PLATFORMS.includes(platform) ? platform : 'INSTAGRAM';

  const review = await prisma.review.create({
    data: {
      name: name.trim(),
      comment: hasComment ? comment.trim() : null,
      screenshotUrl: hasScreenshot ? screenshotUrl : null,
      rating: ratingNumber,
      platform: platformValue,
      source: 'ADMIN',
      status: 'APPROVED',
    },
  });

  return NextResponse.json(review, { status: 201 });
}
