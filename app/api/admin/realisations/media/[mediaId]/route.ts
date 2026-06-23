import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteMedia } from '@/lib/blob';

export async function DELETE(_request: NextRequest, { params }: { params: { mediaId: string } }) {
  const media = await prisma.realisationMedia.findUnique({ where: { id: params.mediaId } });

  if (!media) {
    return NextResponse.json({ error: 'Média introuvable.' }, { status: 404 });
  }

  await deleteMedia(media.url);
  await prisma.realisationMedia.delete({ where: { id: params.mediaId } });

  return NextResponse.json({ success: true });
}
