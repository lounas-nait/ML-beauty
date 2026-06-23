import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadMedia, isBlobConfigured, MAX_PHOTO_SIZE, MAX_VIDEO_SIZE } from '@/lib/blob';
import { MAX_PHOTOS_PER_REALISATION } from '@/lib/realisations';

export async function GET() {
  const realisations = await prisma.realisation.findMany({
    include: { media: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(realisations);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const photos = formData.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  const video = formData.get('video');
  const videoFile = video instanceof File && video.size > 0 ? video : null;

  if (!title || title.length > 100) {
    return NextResponse.json({ error: 'Le titre est invalide.' }, { status: 400 });
  }

  if (!category || category.length > 50) {
    return NextResponse.json({ error: 'La catégorie est invalide.' }, { status: 400 });
  }

  if (photos.length === 0 && !videoFile) {
    return NextResponse.json({ error: 'Ajoutez au moins une photo ou une vidéo.' }, { status: 400 });
  }

  if ((photos.length > 0 || videoFile) && !isBlobConfigured()) {
    return NextResponse.json(
      { error: 'Stockage non configuré sur le serveur (BLOB_READ_WRITE_TOKEN manquant).' },
      { status: 500 }
    );
  }

  if (photos.length > MAX_PHOTOS_PER_REALISATION) {
    return NextResponse.json(
      { error: `Maximum ${MAX_PHOTOS_PER_REALISATION} photos par réalisation.` },
      { status: 400 }
    );
  }

  for (const photo of photos) {
    if (!photo.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Les photos doivent être des images.' }, { status: 400 });
    }
    if (photo.size > MAX_PHOTO_SIZE) {
      return NextResponse.json({ error: 'Une photo dépasse la taille maximale (8 Mo).' }, { status: 400 });
    }
  }

  if (videoFile) {
    if (!videoFile.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Le fichier doit être une vidéo.' }, { status: 400 });
    }
    if (videoFile.size > MAX_VIDEO_SIZE) {
      return NextResponse.json({ error: 'La vidéo dépasse la taille maximale (25 Mo).' }, { status: 400 });
    }
  }

  const photoUrls = await Promise.all(photos.map((photo) => uploadMedia(photo, 'realisations')));
  const videoUrl = videoFile ? await uploadMedia(videoFile, 'realisations') : null;

  const realisation = await prisma.realisation.create({
    data: {
      title,
      category,
      media: {
        create: [
          ...photoUrls.map((url, index) => ({ url, type: 'IMAGE' as const, order: index })),
          ...(videoUrl ? [{ url: videoUrl, type: 'VIDEO' as const, order: MAX_PHOTOS_PER_REALISATION }] : []),
        ],
      },
    },
    include: { media: true },
  });

  return NextResponse.json(realisation, { status: 201 });
}
