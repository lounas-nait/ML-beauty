export interface Review {
  id: string;
  name: string;
  platform: 'Google' | 'Instagram' | 'TikTok' | 'Direct';
  rating: number;
  comment: string | null;
  screenshotUrl?: string | null;
  image: string;
  date?: string;
}

export const getAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return '0.0';
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

export const getTotalReviews = (reviews: Review[]) => reviews.length;

export const getRatingDistribution = (reviews: Review[]) => {
  return {
    '5': reviews.filter((r) => r.rating === 5).length,
    '4': reviews.filter((r) => r.rating === 4).length,
    '3': reviews.filter((r) => r.rating === 3).length,
    '2': reviews.filter((r) => r.rating === 2).length,
    '1': reviews.filter((r) => r.rating === 1).length,
  };
};
