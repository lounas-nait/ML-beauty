export interface RealisationMedia {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
}

export interface Realisation {
  id: string;
  title: string;
  category: string;
  media: RealisationMedia[];
}

export const MAX_PHOTOS_PER_REALISATION = 3;
export const MAX_VIDEOS_PER_REALISATION = 1;
