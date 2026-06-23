'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import BookingModal from '../../components/BookingModal';
import ReserveButton from '../../components/ReserveButton';
import { Realisation } from '../../lib/realisations';

export default function Gallery() {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    fetch('/api/realisations')
      .then((res) => res.json())
      .then((data: Realisation[]) => setRealisations(data))
      .catch(() => setRealisations([]));
  }, []);

  const categories = ['Toutes', ...new Set(realisations.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filteredItems =
    activeCategory === 'Toutes'
      ? realisations
      : realisations.filter((item) => item.category === activeCategory);

  const selected = realisations.find((item) => item.id === selectedId) || null;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] bg-top bg-no-repeat"
        style={{
          backgroundImage: "url('/images/couleurs.png')",
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
        }}
      >
        <div className="absolute inset-0 bg-white/20" />
        <div className="container mx-auto px-4 relative z-10 flex min-h-[70vh] items-start pt-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 mb-4">Ma Galerie</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Découvrez mes dernières réalisations et laissez-vous inspirer pour vos prochains ongles
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeCategory === category
                    ? 'gradient-pink text-white shadow-lg'
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const cover = item.media.find((m) => m.type === 'IMAGE') ?? item.media[0];
              return (
                <div
                  key={item.id}
                  className="group relative h-48 md:h-56 rounded-lg overflow-hidden shadow-md hover-lift cursor-pointer bg-gray-200"
                  onClick={() => setSelectedId(item.id)}
                >
                  {cover?.type === 'VIDEO' ? (
                    <video src={cover.url} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                  ) : (
                    <Image
                      src={cover?.url || '/profile-icon.svg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              );
            })}
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
      {selected && (
        <div
          className="fixed inset-0 z-[1200] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:scale-125 transition"
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto">
              {selected.media.map((m) => (
                <div key={m.id} className="relative h-72 sm:h-80 rounded-lg overflow-hidden">
                  {m.type === 'VIDEO' ? (
                    <video src={m.url} className="absolute inset-0 w-full h-full object-cover" controls playsInline />
                  ) : (
                    <Image src={m.url} alt={selected.title} fill className="object-cover" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-white text-center mt-4 text-sm">{selected.title}</p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Une de ces réalisations vous plaît ?
          </h2>
          <p className="text-white text-lg mb-8">
            Réservez votre rendez-vous et créons ensemble votre look idéal
          </p>
          <ReserveButton
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-rose-500 px-10 py-4 rounded-full font-bold hover:shadow-lg transition"
          >
            Réserver maintenant →
          </ReserveButton>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
