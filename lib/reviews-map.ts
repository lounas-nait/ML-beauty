import type { Review as PrismaReview, ReviewPlatform } from '@prisma/client';
import type { Review } from './reviews';

const PLATFORM_LABEL: Record<ReviewPlatform, Review['platform']> = {
  GOOGLE: 'Google',
  INSTAGRAM: 'Instagram',
  TIKTOK: 'TikTok',
  DIRECT: 'Direct',
};

export function toPublicReview(review: PrismaReview): Review {
  return {
    id: review.id,
    name: review.name,
    platform: PLATFORM_LABEL[review.platform],
    rating: review.rating,
    comment: review.comment,
    screenshotUrl: review.screenshotUrl,
    image: review.image ?? '/profile-icon.svg',
    date: review.createdAt.toISOString(),
  };
}
