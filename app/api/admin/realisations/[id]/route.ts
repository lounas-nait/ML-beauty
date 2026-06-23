import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteMedia } from '@/lib/blob';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const { title, category } = body;
  const data: { title?: string; category?: string } = {};

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 100) {
      return NextResponse.json({ error: 'Le titre est invalide.' }, { status: 400 });
    }
    data.title = title.trim();
  }

  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim().length === 0 || category.trim().length > 50) {
      return NextResponse.json({ error: 'La catégorie est invalide.' }, { status: 400 });
    }
    data.category = category.trim();
  }

  const realisation = await prisma.realisation.update({
    where: { id: params.id },
    data,
    include: { media: true },
  });

  return NextResponse.json(realisation);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const realisation = await prisma.realisation.findUnique({
    where: { id: params.id },
    include: { media: true },
  });

  if (!realisation) {
    return NextResponse.json({ error: 'Réalisation introuvable.' }, { status: 404 });
  }

  await Promise.all(realisation.media.map((m) => deleteMedia(m.url)));
  await prisma.realisation.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
