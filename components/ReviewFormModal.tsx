'use client';

import { useState } from 'react';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewFormModal({ isOpen, onClose }: ReviewFormModalProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setRating(5);
    setComment('');
    setError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Impossible d'envoyer votre avis.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError('Erreur réseau, réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-black transition"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Merci pour votre avis !</h3>
            <p className="text-gray-600">Il sera publié après validation.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Laisser un avis
            </h3>

            {error && (
              <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Votre prénom</span>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </label>

              <div>
                <span className="text-sm font-medium text-gray-700">Votre note</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`text-3xl transition ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Votre commentaire</span>
                <textarea
                  required
                  maxLength={1000}
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Partagez votre expérience..."
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition disabled:opacity-60"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer mon avis'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
