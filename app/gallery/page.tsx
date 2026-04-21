'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      alt: 'Gel classique brillant',
      category: 'Gel',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 2,
      alt: 'Nail art géométrique',
      category: 'Nail Art',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmFpbHN8fHx8fHwxNjI3NzQ5MjAw&ixlib=rb-1.2.1&q=80',
    },
    {
      id: 3,
      alt: 'Semi-permanent rose pastel',
      category: 'Semi-Permanent',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 4,
      alt: 'French manucure moderne',
      category: 'French',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 5,
      alt: 'Nail art 3D paillettes',
      category: 'Nail Art',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 6,
      alt: 'Ombre nails dégradé',
      category: 'Ombre',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 7,
      alt: 'Nail art floral',
      category: 'Nail Art',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 8,
      alt: 'Gold glamour',
      category: 'Luxe',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 9,
      alt: 'Nude élégant',
      category: 'Classique',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 10,
      alt: 'Gel effet marbre',
      category: 'Gel',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 11,
      alt: 'Nail art géométrique doré',
      category: 'Nail Art',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
    {
      id: 12,
      alt: 'Rose poudré mat',
      category: 'Semi-Permanent',
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop',
    },
  ];

  const categories = ['Toutes', ...new Set(galleryItems.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filteredItems =
    activeCategory === 'Toutes'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Ma Galerie</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Découvrez mes dernières réalisations et laissez-vous inspirer pour vos prochains ongles
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeCategory === category
                    ? 'bg-gradient-pink text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-48 md:h-56 rounded-lg overflow-hidden shadow-md hover-lift cursor-pointer bg-gray-200"
                onClick={() => setSelectedImage(item.id)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <p className="text-white font-semibold text-sm">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Pas de réalisations pour cette catégorie pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:scale-125 transition"
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={galleryItems.find((item) => item.id === selectedImage)?.src || ''}
                alt="Galerie zoom"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-white text-center mt-4 text-sm">
              {galleryItems.find((item) => item.id === selectedImage)?.alt}
            </p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Une de ces réalisations vous plaît ?
          </h2>
          <p className="text-white text-lg mb-8">
            Réservez votre rendez-vous et créons ensemble votre look idéal
          </p>
          <a
            href="https://calendly.com/lounas-nait960/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-rose-500 px-10 py-4 rounded-full font-bold hover:shadow-lg transition"
          >
            Réserver maintenant →
          </a>
        </div>
      </section>
    </>
  );
}
