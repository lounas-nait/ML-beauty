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
    platform: 'Instagram',
    rating: 4.5,
    comment: 'Très pro, mes ongles tiennent super bien.',
    image: '/profile-icon.svg',
    date: '2026-05-10',
  },
  {
    id: 2,
    name: 'Toutou',
    platform: 'Instagram',
    rating:5,
    comment: 'Rapide doux et le rendu est parfait.',
    image: '/profile-icon.svg',
    date: '2026-04-08',
  },
  {
    id: 3,
    name: 'Laurie',
    platform: 'Instagram',
    rating: 4.5,
    comment: 'J\'adore mes ongles, service au top !',
    image: '/profile-icon.svg',
    date: '2026-04-30',
  },
  {
    id: 4,
    name: 'Soumia',
    platform: 'Instagram',
    rating: 5,
    comment: 'Très agréable, je recommande vivement.',
    image: '/profile-icon.svg',
    date: '2026-04-25',
  },
];


/*
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
*/

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
