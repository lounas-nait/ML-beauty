'use client';

import { useState, useEffect } from 'react';
import { Prestation } from '@/lib/types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [services, setServices] = useState<Prestation[]>([]);
    const [loading, setLoading] = useState(false);

    const trackReservationChoice = (eventName: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', eventName, {
                page_path: window.location.pathname,
            });
        }
    };

    // 🔒 Bloque le scroll quand modal ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setSelectedService(null);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || services.length > 0) return;

        setLoading(true);
        fetch('/api/prestations')
            .then((res) => res.json())
            .then((data: Prestation[]) => setServices(data))
            .catch(() => setServices([]))
            .finally(() => setLoading(false));
    }, [isOpen, services.length]);

    if (!isOpen) return null;

    const selected = services.find((s) => s.id === selectedService);

    return (
        <div
            className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
            onClick={() => {
                setSelectedService(null);
                onClose();
            }}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg p-6 relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE */}
                <button
                    onClick={() => {
                        setSelectedService(null);
                        onClose();
                    }}
                    className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black transition"
                >
                    ✕
                </button>

                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Réserver un rendez-vous
                </h3>

                {!selectedService ? (
                    <>
                        <p className="text-gray-600 text-center mb-6">
                            Choisissez votre prestation :
                        </p>

                        {loading ? (
                            <div className="text-center text-gray-500 py-12">Chargement des prestations...</div>
                        ) : services.length === 0 ? (
                            <div className="text-center text-gray-500 py-12">
                                Aucune prestation disponible pour le moment.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelectedService(service.id)}
                                        className={`w-full p-4 rounded-xl border text-left transition relative ${
                                            service.isPromo
                                                ? 'border-rose-400 bg-rose-50 hover:bg-rose-100'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-xl mr-2">{service.icon || '💅'}</span>
                                                <span className="font-semibold text-gray-800">
                                                    {service.title}
                                                </span>
                                            </div>

                                            <div className="flex font-semibold text-gray-800 items-center gap-2">
                                                {service.isPromo && service.promoPrice != null && (
                                                    <span className="text-xl text-gray-400 line-through decoration-gray-400">
                                                        {service.priceLabel ? `${service.priceLabel} ${service.price}€` : `${service.price}€`}
                                                    </span>
                                                )}
                                                <span className="text-xl font-bold text-rose-600">
                                                    {service.isPromo && service.promoPrice != null
                                                        ? service.promoLabel
                                                            ? `${service.promoLabel} ${service.promoPrice}€`
                                                            : `${service.promoPrice}€`
                                                        : service.priceLabel
                                                        ? `${service.priceLabel} ${service.price}€`
                                                        : `${service.price}€`}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-gray-600 text-center mb-6">
                            Comment souhaitez-vous réserver ?
                        </p>

                        <div className="space-y-4">
                            {selected?.bookingUrl && (
                                <a
                                    href={selected.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackReservationChoice('reservation_choice_online')}
                                    className="block w-full text-center p-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:shadow-lg transition"
                                >
                                    📅 Réserver en ligne
                                </a>
                            )}

                            <a
                                href="https://www.instagram.com/mlbeauty_77"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackReservationChoice('reservation_choice_instagram')}
                                className="flex items-center justify-center gap-3 w-full p-4 rounded-xl border hover:bg-gray-50 transition"
                            >
                                <img
                                    src="/logos/instagram.webp"
                                    alt="Instagram"
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="font-semibold text-gray-800">
                                    Réserver via Instagram
                                </span>
                            </a>

                        </div>

                        <button
                            onClick={() => setSelectedService(null)}
                            className="mt-6 text-sm text-gray-500 underline w-full text-center"
                        >
                            ← Changer de prestation
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}