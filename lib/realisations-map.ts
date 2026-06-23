import type { Realisation as PrismaRealisation, RealisationMedia as PrismaRealisationMedia } from '@prisma/client';
import type { Realisation } from './realisations';

type RealisationWithMedia = PrismaRealisation & { media: PrismaRealisationMedia[] };

export function toPublicRealisation(realisation: RealisationWithMedia): Realisation {
  return {
    id: realisation.id,
    title: realisation.title,
    category: realisation.category,
    media: [...realisation.media]
      .sort((a, b) => a.order - b.order)
      .map((m) => ({ id: m.id, url: m.url, type: m.type })),
  };
}
