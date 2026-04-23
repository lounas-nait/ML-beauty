'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReviewCard, { StarRating, PlatformBadge } from '@/components/ReviewCard';
import { reviews, reviewVideos, getAverageRating, getTotalReviews, getRatingDistribution } from '@/lib/reviews';

export default function ReviewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();
  const ratingDistribution = getRatingDistribution();

  // Auto-scroll carousel
  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoScroll]);

  const handlePrevSlide = () => {
    setAutoScroll(false);
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNextSlide = () => {
    setAutoScroll(false);
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    '@id': 'https://mlbeauty.com/reviews',
    ratingValue: parseFloat(averageRating),
    reviewCount: totalReviews,
    bestRating: '5',
    worstRating: '1',
    name: 'MLbeauty - Service de Prothésiste Ongulaire',
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Elles parlent de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">MLbeauty</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les avis de nos clientes satisfaites et les résultats que nous créons ensemble
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto border border-rose-100">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-6xl font-bold text-rose-500 mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600">Note globale</p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-24 bg-gray-200"></div>

              {/* Review Count */}
              <div className="text-center">
                <div className="text-5xl font-bold text-rose-500 mb-2">{totalReviews}</div>
                <p className="text-gray-600 text-lg">avis vérifiés</p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-24 bg-gray-200"></div>

              {/* Rating Distribution */}
              <div className="text-center space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="text-gray-600">{star}</span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-400 to-pink-400"
                        style={{
                          width: `${(Number(ratingDistribution[star.toString() as keyof typeof ratingDistribution]) / totalReviews) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Avis de nos clientes</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Découvrez les témoignages authentiques de nos clientes satisfaites
          </p>

          {/* Carousel Container */}
          <div className="relative">
            {/* Cards */}
            <div className="relative h-96 md:h-80">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 scale-95 translate-x-full'
                      : 'opacity-0 scale-95 -translate-x-full'
                  }`}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:translate-x-0 z-10 bg-white hover:bg-rose-100 text-rose-500 p-3 rounded-full shadow-md hover:shadow-lg transition group"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition">‹</span>
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-0 z-10 bg-white hover:bg-rose-100 text-rose-500 p-3 rounded-full shadow-md hover:shadow-lg transition group"
            >
              <span className="text-2xl group-hover:translate-x-1 transition">›</span>
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoScroll(false);
                    setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-rose-500 w-8'
                      : 'bg-rose-200 w-2 hover:bg-rose-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Vidéos de nos réalisations</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Découvrez nos créations en vidéo sur Instagram et TikTok
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewVideos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <Image
                  src={video.thumbnail || ''}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="text-white text-center">
                    <div className="inline-block mb-4 p-3 bg-white/20 backdrop-blur rounded-full">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="font-bold">{video.title}</p>
                    <span className="text-sm opacity-90 mt-1 block">{video.platform}</span>
                  </div>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <PlatformBadge platform={video.platform} />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Suivez-nous pour voir plus de contenu exclusif</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
              >
                📱 Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Vous aussi, partagez votre expérience ! 💬</h2>
          <p className="text-lg md:text-xl mb-8 opacity-95">
            Vos avis nous aident à encore mieux servir nos clientes. Merci de nous laisser un commentaire sur Google, Instagram ou TikTok !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow hover:-translate-y-1"
            >
              ⭐ Google Avis
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow hover:-translate-y-1"
            >
              📸 Instagram DM
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow hover:-translate-y-1"
            >
              🎵 TikTok
            </a>
          </div>

          <div className="mt-12 pt-12 border-t border-white/30">
            <p className="text-sm opacity-90">Les avis Google aident davantage le référencement local de our salon. Merci 🙏</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="py-6 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-rose-500 transition">
              Accueil
            </Link>
            <span>›</span>
            <span className="text-rose-500 font-medium">Avis Clients</span>
          </nav>
        </div>
      </section>
    </>
  );
}
