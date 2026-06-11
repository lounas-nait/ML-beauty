'use client';

import { useState } from 'react';
import BookingModal from '../../components/BookingModal';
import ReserveButton from '../../components/ReserveButton';
import { Hand, Sparkles, LucideBrush } from "lucide-react";

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const services = [

    {
      id: 1,
      icon: <Hand />,
      title: 'Semi-Permanent main',
      description: 'Vernis semi-permanent haute tenue pour des ongles naturels renforcés',
      features: ['Durée : 2-3 semaines', 'Finition brillante impeccable', 'Résultat naturel et élégant'],
      price: '20€',
    },
    {
      id: 2,
      icon: <LucideBrush />,
      title: 'Semi-Permanent pied',
      description: 'Pose semi-permanente longue tenue pour des pieds élégants et soignés.',
      features: ['Durée : 2-3 semaines', 'Finition brillante impeccable', 'Résultat naturel et élégant'],
      price: '30€',
    },
    {
      id: 3,
      icon: <Sparkles />,
      title: 'Dépose Semi-Permanent',
      description: 'Retrait professionnel du vernis semi-permanent en douceur, sans abîmer l’ongle naturel',
      features: [
        'Méthode sécurisée et contrôlée',
        'Respect total de l’ongle naturel',
        'Nettoyage et finition soignée'
      ],
      price: 'À partir de 10€',
    },
    
    /*
    {
      id: 3,
      icon: '✨',
      title: 'Pose Gel Premium',
      description: 'Ongles gel ultra-longs et résistants avec finition brillante',
      features: ['Durée : 3-4 semaines', 'Vernis brillant ou mat', 'Renforcement des ongles naturels'],
      price: 'À partir de 45€',
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Nail Art Personnalisé',
      description: 'Designs créatifs et originaux adaptés à vos envies',
      features: ['Designs uniques', 'Motifs variés', 'Strass et paillettes disponibles'],
      price: 'À partir de 50€',
    },
    {
      id: 5,
      icon: '👑',
      title: 'Stylage Ongles Naturels',
      description: 'Mise en forme et traitement des ongles naturels',
      features: ['Limage professionnelle', 'Cuticules traitées', 'Vernis ou finition colorée'],
      price: 'À partir de 25€',
    },
    {
      id: 6,
      icon: '💍',
      title: 'Nail Art Complexe',
      description: 'Créations artisanales avec détails et techniques avancées',
      features: ['3D et effets', 'Peinture acrylique', 'Décoration luxe'],
      price: 'À partir de 60€',
    },
    {
      id: 7,
      icon: '🌸',
      title: 'Manucure Complète',
      description: 'Soin complet des mains et des ongles',
      features: ['Gommage des mains', 'Hydratation intensive', 'Pose gel ou semi-permanent'],
      price: 'À partir de 55€',
    },
    */
  ];

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
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 mb-6">Mes Prestations</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Des services haut de gamme adaptés à tous vos besoins pour des ongles magnifiques
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-rose-100 overflow-hidden hover-lift bg-gradient-to-br from-white to-rose-50"
              >
                {/* Card Header */}
                <div className="p-8 border-b border-rose-100">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                    {service.price}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <h4 className="font-bold text-gray-900 mb-4">Inclus :</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <span className="text-rose-500 font-bold mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="p-8 bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100">
                  <ReserveButton
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="block w-full gradient-pink text-white text-center py-2 rounded-lg font-bold hover:shadow-lg transition"
                  >
                    Réserver cette prestation
                  </ReserveButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 md:p-12 border border-rose-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations Pratiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 Service à Domicile</h3>
                <p className="text-gray-600 mb-4">
                  Je me déplace aussi à votre domicile pour votre confort. Plus besoin de vous faire la route !
                  Le déplacement est facturé 5€ supplémentaires jusqu'à 5 km. Au-delà, le tarif est sur demande.
                </p>
                <p className="text-gray-600">
                  <strong>Zone d'intervention :</strong> Chessy et alentours (jusqu'à 15 km)
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">⏱️ Durée des Prestations</h3>
                <ul className="space-y-2 text-gray-600">

                  <li>• Semi-Permanent : 1h</li>

                  <li>• Dépose Semi-Permanent : 45 min</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Modes de Paiement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Espèces</li>
                  <li>• Virement bancaire</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">❓ Questions Fréquentes</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Puis-je mettre du vernis après ?</strong> Non, le vernis dur se suffit à lui-même.
                </p>
                <p className="text-gray-600">
                  <strong>Quel entretien ?</strong> Crème hydratante régulièrement, éviter l'eau chaude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 gradient-pink">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Envie d'une beauté des ongles ?</h2>
          <ReserveButton
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-rose-500 px-8 py-3 rounded-full font-bold hover:shadow-lg transition"
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
