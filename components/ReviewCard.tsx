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
  const isScreenshot = Boolean(review.screenshotUrl);

  return (
    <div
      className={`h-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 ring-1 ring-rose-100/70 flex flex-col overflow-hidden hover:shadow-[0_8px_40px_rgb(236,72,153,0.15)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 pt-5 sm:pt-6 pb-3">
        {!isScreenshot && (
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden shadow-sm ring-2 ring-white">
            <Image src={review.image} alt={review.name} fill className="object-cover" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900 truncate">{review.name}</h3>
            <PlatformBadge platform={review.platform} />
          </div>
          <div className="mt-1">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-5 sm:px-6 pb-5 sm:pb-6">
        {isScreenshot ? (
          <div className="relative w-full h-full min-h-[140px] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 ring-1 ring-rose-100/80 shadow-inner">
            <Image
              src={review.screenshotUrl as string}
              alt={`Capture d'écran de l'avis de ${review.name}`}
              fill
              unoptimized
              className="object-contain p-2"
            />
          </div>
        ) : (
          <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
        )}
      </div>

      {review.date && (
        <p className="text-xs text-gray-400 px-5 sm:px-6 pb-4 -mt-2">
          {new Date(review.date).toLocaleDateString('fr-FR')}
        </p>
      )}
    </div>
  );
}

export { StarRating, PlatformBadge };
