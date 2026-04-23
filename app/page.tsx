'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SERVICES } from '../lib/constants';

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

  const testimonials = [
    {
      id: 1,
      name: 'Sophie M.',
      text: 'Service impeccable, très professionnelle ! Les ongles sont magnifiques et durent longtemps.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Clara B.',
      text: 'J\'adore le confort de ne pas sortir de chez moi. Les prestations sont toujours de qualité.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Léa D.',
      text: 'Créative et à l\'écoute de mes envies. Je recommande vivement !',
      rating: 5,
    },
  ];

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
              className="inline-flex items-center gap-2 bg-gradient-pink text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
            >
              Voir la galerie complète
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Avis Clients</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ce que mes clientes pensent de mon travail
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-8 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover-lift"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
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
