'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    // For now, just simulate a submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nous Contacter</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Vous avez des questions ? Je suis là pour vous aider et répondre à toutes vos demandes
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Mes Coordonnées</h2>

              <div className="space-y-8">


                {/* Phone */}
                {/*
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-pink text-white text-xl">
                      📱
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Téléphone</h3>
                    <a
                      href="tel:+33612345678"
                      className="text-rose-500 hover:text-rose-600 font-semibold"
                    >
                      +33 6 98 02 86 76
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Disponible 7j/7 de 9h à 20h
                    </p>
                  </div>
                </div>
                */}

                {/* Email */}
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-pink text-white text-xl">
                      ✉️
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                    <a
                      href="mailto:mlbeauty.contactpro@gmail.com"
                      className="text-rose-500 hover:text-rose-600 font-semibold"
                    >
                      mlbeauty.contactpro@gmail.com
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>
                

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-pink text-white text-xl">
                      📍
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Zone de Déplacement</h3>
                    <p className="text-gray-700 font-semibold">Chessy 77700 et alentours</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Rayon d'action : jusqu'à 15 km de Chessy-Val d'europe
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-500 to-pink-500 text-white text-xl">
                      <img src="/logos/instagram.webp" alt="Instagram" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Instagram</h3>
                    <a
                      href="https://instagram.com/mlbeauty_77?igsh=MW5oYXpiOXBneDdrYg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-500 hover:text-rose-600 font-semibold"
                    >
                      @mlbeauty_77
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Nous écrire sur Instagram
                    </p>
                  </div>
                </div>

                {/* TikTok */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-500 text-white text-xl">
                      <img src="/logos/tiktok.webp" alt="TikTok" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">TikTok</h3>
                    <a
                      href="https://tiktok.com/@mlbeauty_77?igsh=MW5oYXpiOXBneDdrYg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-600 hover:text-700 font-semibold"
                    >
                      Suivez mes dernières créations
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Disponible pour vos questions
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">La meilleure façon de réserver</h3>
                <p className="text-gray-600 mb-6">
                  Consultez mes disponibilités directement sur Calendly et choisissez le créneau qui vous convient
                </p>
                <a
                  href="https://calendly.com/lounas-nait960/semi-permanent-1h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full gradient-pink text-white text-center py-3 rounded-lg font-bold hover:shadow-lg transition"
                >
                  Accéder à Calendly
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez un Message</h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                  ✅ Merci ! Votre message a bien été envoyé. Je vous recontacterai rapidement.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Votre Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                    placeholder="Sophie Dupont"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Votre Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                    placeholder="sophie@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Votre Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition resize-none"
                    placeholder="Parlez-moi de vos envies et de votre projet..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full gradient-pink text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  Envoyer le Message
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  💡 <strong>Conseil :</strong> Pour une réservation rapide, préférez directement Calendly où vous verrez toutes les disponibilités
                </p>
                <p className="text-sm text-gray-600">
                  ⏱️ <strong>Délai de réponse :</strong> Je réponds généralement sous 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Zone de Déplacement</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-2">🗺️</p>
              <p className="text-gray-600">Chessy-Val d'europe</p>
              <p className="text-sm text-gray-500 mt-2">
                Consultez vos décalages de déplacement sur Calendly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Questions Fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'Quel est le prix des prestations ?',
                a: 'Les tarifs dépendent de la prestation. La pose gel commence à partir de 45€, le semi-permanent à 35€. Les tarifs exacts seront affichés lors de votre rendez-vous.',
              },
              {
                q: 'Proposez-vous des réductions pour les clients réguliers ?',
                a: 'Oui ! Une formule abonnement est disponible. Contactez-moi pour les détails.',
              },
              {
                q: 'Puis-je me faire rembourser si je suis insatisfaite ?',
                a: 'Je vous propose un rendez-vous de retouche gratuite si vous n\'êtes pas satisfaite. Votre satisfaction est ma priorité !',
              },
              {
                q: 'Combien de temps durent les ongles ?',
                a: 'Gel : 3-4 semaines | Semi-permanent : 2-3 semaines | Les ongles naturels : dépend de votre entretien',
              },
              {
                q: 'Y a-t-il un supplément pour le déplacement ?',
                a: 'Non, le déplacement est offert sur Paris et Île-de-France (15 km). Au-delà, consultez-moi pour un tarif spécial.',
              },
              {
                q: 'Comment se déroule un premier rendez-vous ?',
                a: 'J\'arrive 10 min avant pour installer mon matériel. Nous discutons de votre projet, je propose des idées, puis on crée ensemble !',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-rose-50 border border-rose-200">
                <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
