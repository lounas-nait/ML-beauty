'use client';

import Image from 'next/image';
import type { Review } from '@/lib/reviews';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg transition-all duration-300 ${
          i < rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ))}
  </div>
);

const PlatformBadge = ({ platform }: { platform: string }) => {
  const colors: Record<string, string> = {
    Google: 'bg-blue-100 text-blue-800',
    Instagram: 'bg-pink-100 text-pink-800',
    TikTok: 'bg-black text-white',
    Direct: 'bg-rose-100 text-rose-800',
  };

  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors[platform] || colors.Direct}`}>
      {platform}
    </span>
  );
};

export default function ReviewCard({ review, className = '' }: ReviewCardProps) {
  return (
    <div
      className={`h-full bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-rose-100 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm ${className}`}
    >
      <div className="flex-shrink-0">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md ring-4 ring-white">
          <Image
            src={review.image}
            alt={review.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
            <PlatformBadge platform={review.platform} />
          </div>
          <div className="mb-3">
            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-700 text-lg italic leading-relaxed">"{review.comment}"</p>
        </div>
        {review.date && <p className="text-sm text-gray-500 mt-4">{new Date(review.date).toLocaleDateString('fr-FR')}</p>}
      </div>
    </div>
  );
}

export { StarRating, PlatformBadge };
