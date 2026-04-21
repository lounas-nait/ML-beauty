'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center pt-10 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* Left: Text Content */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sublimez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">ongles</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Service de prothésiste ongulaire haut de gamme <strong>à domicile</strong>. Confort, qualité et créativité.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                📍 <strong>Zone d'intervention :</strong> Chessy 77700 et alentours (15 km)
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://calendly.com/lounas-nait960/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-pink text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  Réserver maintenant →
                </a>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center border-2 border-rose-500 text-rose-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-rose-50 transition"
                >
                  Voir mes réalisations
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-rose-500">500+</div>
                  <div className="text-sm text-gray-600">Clientes satisfaites</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-500">5/5</div>
                  <div className="text-sm text-gray-600">Avis clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-500">4 ans</div>
                  <div className="text-sm text-gray-600">D'expérience</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl hover-lift group">
              <Image
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop"
                alt="Nail Art Professionnel"
                fill
                priority
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative h-48 rounded-xl overflow-hidden shadow-md hover-lift group bg-gray-200"
              >
                <Image
                  src={`https://images.unsplash.com/photo-160465489${Math.floor(Math.random() * 10)}11-df63bc536371?w=300&h=300&fit=crop`}
                  alt={`Réalisation ${item}`}
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
