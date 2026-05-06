'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Service {
    id: string;
    title: string;
    icon: string;
    price: string;
    calendly: string;
    oldPrice?: string;
    promo?: boolean;
    savings?: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    // 🔒 Bloque le scroll quand modal ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const services: Service[] = [
        {
            id: 'semi',
            title: 'Semi-Permanent',
            icon: '💅',
            price: '20€',
            calendly: 'https://calendly.com/mlbeauty77/semi-permanent-1h',
        },
        {
            id: 'depose',
            title: 'Dépose',
            icon: '✨',
            price: '10€',
            calendly: 'https://calendly.com/mlbeauty77/depose',
        },
        {
            id: 'combo',
            title: 'Dépose + Semi-Permanent',
            icon: '🔥',
            oldPrice: '30€',
            price: '25€',
            promo: true,
            savings: '5€',
            calendly: 'https://calendly.com/mlbeauty77/depose-semi',
        },
    ];

    const selected = services.find((s) => s.id === selectedService);

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
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

                        <div className="space-y-4">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    className={`w-full p-4 rounded-xl border text-left transition relative
                    ${service.promo
                                            ? 'border-rose-400 bg-rose-50 hover:bg-rose-100'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >


                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-xl mr-2">{service.icon}</span>
                                            <span className="font-semibold text-gray-800">
                                                {service.title}
                                            </span>
                                        </div>

                                        <div className="flex  font-semibold text-gray-800 items-center gap-2">
                                            {service.oldPrice && (
                                                <span className="text-xl text-gray-400 line-through decoration-gray-400">
                                                    {service.oldPrice}
                                                </span>
                                            )}
                                            <span className="text-xl font-bold text-rose-600">
                                                {service.price}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-600 text-center mb-6">
                            Comment souhaitez-vous réserver ?
                        </p>

                        <div className="space-y-4">
                            <a
                                href={selected?.calendly}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center p-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold hover:shadow-lg transition"
                            >
                                📅 Réserver en ligne
                            </a>

                            <a
                                href="https://instagram.com/mlbeauty_77?igsh=MW5oYXpiOXBneDdrYg=="
                                target="_blank"
                                rel="noopener noreferrer"
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