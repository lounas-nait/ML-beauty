export interface Review {
  id: number;
  name: string;
  platform: 'Google' | 'Instagram' | 'TikTok' | 'Direct';
  rating: number;
  comment: string;
  image: string;
  date?: string;
}

export interface Video {
  id: number;
  title: string;
  platform: 'Instagram' | 'TikTok';
  url: string;
  thumbnail?: string;
}

// Mock reviews data
export const reviews: Review[] = [
  {
    id: 1,
    name: 'Valérie',
    platform: 'Google',
    rating: 5,
    comment: 'Service impeccable, très professionnelle ! Les ongles sont magnifiques et durent longtemps. Je recommande vivement !',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    date: '2024-04-15',
  },
  {
    id: 2,
    name: 'Dyhia.',
    platform: 'Google',
    rating: 5,
    comment: 'Créative et à l\'écoute de mes envies. Les designs sont uniques et bien exécutés. Vraiment top !',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    date: '2024-04-08',
  },
  {
    id: 3,
    name: 'Laurie.',
    platform: 'Direct',
    rating: 5,
    comment: 'Excellente qualité de travail. Les ongles tiennent super bien et les couleurs sont exactement ce que je voulais. À bientôt !',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=400&fit=crop',
    date: '2024-03-30',
  },
  {
    id: 4,
    name: 'Toutou.',
    platform: 'Google',
    rating: 5,
    comment: 'Service à domicile super pratique ! Les résultats valent vraiment le coup. Je suis devenue une cliente régulière.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop',
    date: '2024-03-25',
  },
];

// Mock videos data
export const reviewVideos: Video[] = [
  {
    id: 1,
    title: 'Pose Gel Premium',
    platform: 'Instagram',
    url: 'https://www.instagram.com/reel/example1',
    thumbnail: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Nail Art Complexe',
    platform: 'TikTok',
    url: 'https://www.tiktok.com/@example',
    thumbnail: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Transformation Ongles',
    platform: 'Instagram',
    url: 'https://www.instagram.com/reel/example3',
    thumbnail: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=300&h=600&fit=crop',
  },
];

// Aggregate data
export const getAverageRating = () => {
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

export const getTotalReviews = () => reviews.length;

export const getRatingDistribution = () => {
  return {
    '5': reviews.filter(r => r.rating === 5).length,
    '4': reviews.filter(r => r.rating === 4).length,
    '3': reviews.filter(r => r.rating === 3).length,
    '2': reviews.filter(r => r.rating === 2).length,
    '1': reviews.filter(r => r.rating === 1).length,
  };
};
