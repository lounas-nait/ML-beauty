import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadMedia, isBlobConfigured, MAX_PHOTO_SIZE, MAX_VIDEO_SIZE } from '@/lib/blob';
import { MAX_PHOTOS_PER_REALISATION, MAX_VIDEOS_PER_REALISATION } from '@/lib/realisations';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const file = formData.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Fichier manquant.' }, { status: 400 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: 'Stockage non configuré sur le serveur (BLOB_READ_WRITE_TOKEN manquant).' },
      { status: 500 }
    );
  }

  const realisation = await prisma.realisation.findUnique({
    where: { id: params.id },
    include: { media: true },
  });

  if (!realisation) {
    return NextResponse.json({ error: 'Réalisation introuvable.' }, { status: 404 });
  }

  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');

  if (!isVideo && !isImage) {
    return NextResponse.json({ error: 'Type de fichier non supporté.' }, { status: 400 });
  }

  const photoCount = realisation.media.filter((m) => m.type === 'IMAGE').length;
  const videoCount = realisation.media.filter((m) => m.type === 'VIDEO').length;

  if (isImage) {
    if (file.size > MAX_PHOTO_SIZE) {
      return NextResponse.json({ error: 'Photo trop volumineuse (max 8 Mo).' }, { status: 400 });
    }
    if (photoCount >= MAX_PHOTOS_PER_REALISATION) {
      return NextResponse.json(
        { error: `Maximum ${MAX_PHOTOS_PER_REALISATION} photos par réalisation.` },
        { status: 400 }
      );
    }
  } else {
    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json({ error: 'Vidéo trop volumineuse (max 25 Mo).' }, { status: 400 });
    }
    if (videoCount >= MAX_VIDEOS_PER_REALISATION) {
      return NextResponse.json(
        { error: `Maximum ${MAX_VIDEOS_PER_REALISATION} vidéo par réalisation.` },
        { status: 400 }
      );
    }
  }

  const url = await uploadMedia(file, 'realisations');

  const media = await prisma.realisationMedia.create({
    data: {
      realisationId: params.id,
      url,
      type: isVideo ? 'VIDEO' : 'IMAGE',
      order: isVideo ? MAX_PHOTOS_PER_REALISATION : photoCount,
    },
  });

  return NextResponse.json(media, { status: 201 });
}
