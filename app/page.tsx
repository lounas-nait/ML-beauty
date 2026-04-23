'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SERVICES } from '../lib/constants';
import { reviews, getAverageRating } from '../lib/reviews';
import ReviewCard from '../components/ReviewCard';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=800&fit=crop',
    service: SERVICES[0], // Pose Gel Premium
  },
  {
    id: 2,
    image: '/images/semiperm.jpeg',
    service: SERVICES[1], // Semi-Permanent
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=800&fit=crop',
    service: SERVICES[2], // Nail Art Personnalisé
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=1200&h=800&fit=crop',
    service: SERVICES[3], // Stylage Ongles Naturels
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

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
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                    <a
                      href="https://calendly.com/lounas-nait960/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
                    >
                      Réserver maintenant →
                    </a>
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
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Avis Clients */}
      <section className="py-16 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="container mx-auto max-w-6xl">
          

          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="inline-flex items-center gap-4 rounded-full bg-white/90 px-6 py-3 shadow-sm border border-rose-100">
              <span className="text-5xl font-bold text-rose-500">{averageRating}</span>
              <span className="text-sm text-gray-500">/5</span>
              <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-500">({homeReviews.length} avis sélectionnés)</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[420px] md:h-[360px]">
              {homeReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === reviewSlide
                      ? 'opacity-100 scale-100 translate-x-0'
                      : index < reviewSlide
                      ? 'opacity-0 scale-95 translate-x-full'
                      : 'opacity-0 scale-95 -translate-x-full'
                  }`}
                >
                  <ReviewCard review={review} className="min-h-[320px]" />
                </div>
              ))}
            </div>

            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:translate-x-0 z-10 bg-white hover:bg-rose-100 text-rose-500 p-3 rounded-full shadow-md hover:shadow-lg transition group"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition">‹</span>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-0 z-10 bg-white hover:bg-rose-100 text-rose-500 p-3 rounded-full shadow-md hover:shadow-lg transition group"
            >
              <span className="text-2xl group-hover:translate-x-1 transition">›</span>
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {homeReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setReviewSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === reviewSlide ? 'bg-rose-500 w-8' : 'bg-rose-200 w-2 hover:bg-rose-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition"
            >
              Voir tous les avis
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Mes Prestations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Découvrez mes services haut de gamme adaptés à tous vos envies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '✨',
                title: 'Pose Gel',
                description: 'Ongles longs et résistants avec finition brillante',
              },
              {
                icon: '💅',
                title: 'Semi-Permanent',
                description: 'Vernis semi-permanent 2-3 semaines',
              },
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
            ].map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover-lift text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-rose-500 font-bold hover:gap-3 transition"
            >
              Voir tous les services →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Dernières Réalisations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explorez mes créations et trouvez l'inspiration pour vos prochains ongles
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              heroSlides[0].image,
              heroSlides[1].image,
              heroSlides[2].image,
              heroSlides[3].image,
              heroSlides[0].image,
              heroSlides[1].image,
              heroSlides[2].image,
              heroSlides[3].image,
            ].map((imageSrc, item) => (
              <div
                key={item}
                className="relative h-48 rounded-xl overflow-hidden shadow-md hover-lift group bg-gray-200"
              >
                <Image
                  src={imageSrc}
                  alt={`Réalisation ${item + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 gradient-pink text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
            >
              Voir la galerie complète
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Prête à vous réserver ?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Disponibilités à partir de demain. Choisissez votre créneau directement sur le calendrier.
          </p>
          <a
            href="https://calendly.com/lounas-nait960/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-rose-500 px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
          >
            Réserver un rendez-vous →
          </a>
        </div>
      </section>
    </>
  );
}
