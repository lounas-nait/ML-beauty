'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SERVICES } from '../lib/constants';
import { reviews, getAverageRating } from '../lib/reviews';
import ReviewCard from '../components/ReviewCard';
import { realisations } from '../lib/realisations';
import BookingModal from '../components/BookingModal';

const heroSlides = [
  {
    id: 1,
    image: '/images/realisattions/P11.jpg',
    service: SERVICES[1], // semi-permanent
  },
  {
    id: 2,
    image: '/images/realisattions/33.jpg',
    service: SERVICES[6], // Semi-Permanent
  },

];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };


  const homeReviews = reviews.slice(0, 4);
  const averageRating = getAverageRating();
  const [reviewSlide, setReviewSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewSlide((prev) => (prev + 1) % homeReviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [homeReviews.length]);

  const prevReview = () => {
    setReviewSlide((prev) => (prev - 1 + homeReviews.length) % homeReviews.length);
  };

  const nextReview = () => {
    setReviewSlide((prev) => (prev + 1) % homeReviews.length);
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="relative h-[90vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.service.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <div className="mb-4">
                    <span className="text-2xl">{slide.service.icon}</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.service.title}
                  </h1>
                  <p className="text-xl mb-6 opacity-90">
                    {slide.service.description}
                  </p>
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {slide.service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="text-rose-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-3xl font-bold text-rose-400 mb-8">
                    {slide.service.price}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsBookingOpen(true)}

                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
                    >
                      Réserver maintenant →
                    </button>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition"
                    >
                      Voir toutes les prestations
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
        >
          ›
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Avis Clients */}
      <section className="py-16 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-x-hidden">
        <div className="container mx-auto max-w-6xl">

          {/* Rating */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 rounded-full bg-white/90 px-4 sm:px-6 py-3 shadow-sm border border-rose-100 text-center">
              <span className="text-3xl sm:text-5xl font-bold text-rose-500">
                {averageRating}
              </span>
              <span className="text-sm text-gray-500">/5</span>
              <span className="text-yellow-400 text-xl sm:text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({homeReviews.length} avis sélectionnés)
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">

            <div className="relative h-[360px] sm:h-[420px] overflow-hidden">

              {homeReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${index === reviewSlide
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 scale-95'
                    }`}
                >
                  <ReviewCard review={review} className="min-h-[300px]" />
                </div>
              ))}

            </div>

            {/* Buttons NAV - FIX MOBILE SAFE */}
            <button
              onClick={prevReview}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-rose-100 text-rose-500 p-2 sm:p-3 rounded-full shadow-md transition"
            >
              <span className="text-xl sm:text-2xl">‹</span>
            </button>

            <button
              onClick={nextReview}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-rose-100 text-rose-500 p-2 sm:p-3 rounded-full shadow-md transition"
            >
              <span className="text-xl sm:text-2xl">›</span>
            </button>

          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {homeReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setReviewSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === reviewSlide ? 'bg-rose-500 w-6 sm:w-8' : 'bg-rose-200 w-2'
                  }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition"
            >
              Voir tous les avis
            </Link>
          </div>

        </div>
      </section>

      {/* Services Preview */}
      <section className="pt-20 pb-0 bg-white">
        <div className="container mx-auto px-4">

          {/* TITRE */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mes Prestations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Découvrez mes services haut de gamme adaptés à vos envies.
            </p>
          </div>

          {/* GRID SERVICES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">

            {[
              {
                icon: '💅',
                title: 'Semi-Permanent',
                description: 'Vernis semi-permanent 2-3 semaines',
              },
              {
                icon: '✨',
                title: 'Dépose Semi-Permanent',
                description: 'Retrait du vernis semi-permanent en douceur',
              },

              /*
              {
                icon: '🎨',
                title: 'Nail Art',
                description: 'Designs personnalisés et créatifs',
              },
              {
                icon: '👑',
                title: 'Stylage Ongles',
                description: 'Mise en forme et traitement des ongles naturels',
              },
              */
            ].map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover:shadow-xl transition text-center"
              >
                <div className="text-5xl mb-5">{service.icon}</div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-rose-500 font-bold hover:gap-3 transition text-sm md:text-base"
            >
              Voir tous les services →
            </Link>
          </div>

        </div>
      </section>

      {/* RÉALISATIONS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Dernières Réalisations
          </h2>

          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Découvrez mes créations récentes.
          </p>

          {/* DATA */}
          {(() => {


            // ⚠️ hook ici OK (dans composant, pas dans map)
            const [selectedRealisation, setSelectedRealisation] = useState<any>(null);

            return (
              <>
                {/* GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {realisations.map((real) => (
                    <div
                      key={real.id}
                      onClick={() => setSelectedRealisation(real)}
                      className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                    >
                      <Image
                        src={real.images[0]}
                        alt={real.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          Voir
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MODAL RESPONSIVE */}
                {selectedRealisation && (
                  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-6">

                    <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-4 sm:p-6">

                      {/* CLOSE */}
                      <button
                        onClick={() => setSelectedRealisation(null)}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 text-2xl"
                      >
                        ✕
                      </button>

                      {/* TITLE */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                        {selectedRealisation.title}
                      </h3>

                      {/* IMAGES GRID */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {selectedRealisation.images.map((img: string, index: number) => (
                          <div
                            key={index}
                            className="relative w-full aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                )}
              </>
            );
          })()}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Prête à vous réserver ?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Disponibilités à partir de demain. Choisissez votre créneau directement sur le calendrier.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-rose-500 px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
          >
            Réserver un rendez-vous →
          </button>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
