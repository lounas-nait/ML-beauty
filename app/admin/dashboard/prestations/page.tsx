'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { Prestation } from '@/lib/types';

interface AdminPrestation extends Prestation {
  editPrice: string;
  editPromoPrice: string;
  featuresText: string;
}

type NewPrestation = {
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  icon: string;
  bookingUrl: string;
  imageUrl: string;
  isPromo: boolean;
  promoPrice: number;
  promoLabel: string;
  editPrice: string;
  editPromoPrice: string;
  featuresText: string;
};

const DEFAULT_PRESTATION: NewPrestation = {
  title: '',
  description: '',
  price: 0,
  priceLabel: '',
  icon: '',
  bookingUrl: '',
  imageUrl: '',
  isPromo: false,
  promoPrice: 0,
  promoLabel: '',
  editPrice: '0',
  editPromoPrice: '0',
  featuresText: '',
};

const parseFeaturesText = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export default function AdminPrestationsPage() {
  const [prestations, setPrestations] = useState<AdminPrestation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrestation, setNewPrestation] = useState<NewPrestation>(DEFAULT_PRESTATION);
  const [updateLoadingId, setUpdateLoadingId] = useState<number | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);
  const [reorderLoadingId, setReorderLoadingId] = useState<number | null>(null);

  const loadPrestations = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/prestations');
    if (res.ok) {
      const data: Prestation[] = await res.json();
      setPrestations(
        data.map((item) => ({
          ...item,
          editPrice: item.price.toString(),
          editPromoPrice: item.promoPrice?.toString() || '',
          featuresText: (item.features || []).join('\n'),
        }))
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPrestations();
  }, []);

  const resetForm = () => {
    setNewPrestation({
      ...DEFAULT_PRESTATION,
      price: 0,
      editPrice: '0',
      editPromoPrice: '0',
      featuresText: '',
    });
    setError('');
  };

  const formatPrice = (value: string) => value.replace(/[^0-9.,]/g, '').replace(',', '.');

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!newPrestation.title.trim()) {
      setError('Le titre est requis.');
      return;
    }

    const price = Number(formatPrice(newPrestation.editPrice));
    if (!Number.isFinite(price) || price < 0) {
      setError('Le prix est invalide.');
      return;
    }

    if (newPrestation.isPromo && (!newPrestation.editPromoPrice || Number(formatPrice(newPrestation.editPromoPrice)) < 0)) {
      setError('Le prix promotionnel est invalide.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: newPrestation.title.trim(),
        description: newPrestation.description.trim() || null,
        price,
        priceLabel: newPrestation.priceLabel.trim() || null,
        icon: newPrestation.icon.trim() || null,
        bookingUrl: newPrestation.bookingUrl.trim() || null,
        imageUrl: newPrestation.imageUrl.trim() || null,
        isPromo: newPrestation.isPromo,
        promoPrice: newPrestation.isPromo ? Number(formatPrice(newPrestation.editPromoPrice)) : null,
        promoLabel: newPrestation.isPromo ? newPrestation.promoLabel.trim() || null : null,
        features: parseFeaturesText(newPrestation.featuresText),
      };

      const res = await fetch('/api/admin/prestations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Impossible de créer la prestation.');
        return;
      }

      resetForm();
      await loadPrestations();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: number) => {
    const prestation = prestations.find((item) => item.id === id);
    if (!prestation) return;

    setError('');
    setUpdateLoadingId(id);

    try {
      const price = Number(formatPrice(prestation.editPrice));
      const payload: Record<string, unknown> = {
        title: prestation.title.trim(),
        description: prestation.description?.trim() || null,
        price,
        priceLabel: prestation.priceLabel?.trim() || null,
        icon: prestation.icon?.trim() || null,
        bookingUrl: prestation.bookingUrl?.trim() || null,
        imageUrl: prestation.imageUrl?.trim() || null,
        isPromo: prestation.isPromo,
        promoPrice: prestation.isPromo ? Number(formatPrice(prestation.editPromoPrice)) : null,
        promoLabel: prestation.isPromo ? prestation.promoLabel?.trim() || null : null,
        features: parseFeaturesText(prestation.featuresText),
      };

      const res = await fetch(`/api/admin/prestations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Impossible de mettre à jour la prestation.');
        return;
      }

      await loadPrestations();
    } finally {
      setUpdateLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer définitivement cette prestation ?')) return;

    setDeleteLoadingId(id);
    try {
      await fetch(`/api/admin/prestations/${id}`, { method: 'DELETE' });
      await loadPrestations();
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleMove = async (id: number, direction: 'up' | 'down') => {
    const index = prestations.findIndex((item) => item.id === id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (index === -1 || swapIndex < 0 || swapIndex >= prestations.length) return;

    const current = prestations[index];
    const neighbor = prestations[swapIndex];

    setReorderLoadingId(id);
    try {
      await Promise.all([
        fetch(`/api/admin/prestations/${current.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: neighbor.order ?? 0 }),
        }),
        fetch(`/api/admin/prestations/${neighbor.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: current.order ?? 0 }),
        }),
      ]);
      await loadPrestations();
    } finally {
      setReorderLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des prestations</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-rose-500 underline">
              ← Modération des avis
            </Link>
            <Link href="/admin/dashboard/realisations" className="text-sm text-gray-600 hover:text-rose-500 underline">
              Réalisations & Galerie →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Créer une nouvelle prestation</h2>

          {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">{error}</p>}

          <form onSubmit={handleCreate} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Titre</span>
              <input
                type="text"
                required
                value={newPrestation.title}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Semi-Permanent mains"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Prix</span>
              <input
                type="text"
                required
                value={newPrestation.editPrice}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, editPrice: formatPrice(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="20"
              />
            </label>

            <label className="block xl:col-span-2">
              <span className="text-sm font-medium text-gray-700">Description</span>
              <textarea
                value={newPrestation.description}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, description: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                rows={3}
                placeholder="Courte description de la prestation"
              />
            </label>

            <label className="block xl:col-span-2">
              <span className="text-sm font-medium text-gray-700">Points inclus (un par ligne)</span>
              <textarea
                value={newPrestation.featuresText}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, featuresText: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                rows={3}
                placeholder={'Durée : 2-3 semaines\nFinition brillante impeccable'}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Libellé du prix</span>
              <input
                type="text"
                value={newPrestation.priceLabel}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, priceLabel: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="À partir de"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Icône</span>
              <input
                type="text"
                value={newPrestation.icon}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, icon: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="💅"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">URL de réservation</span>
              <input
                type="text"
                value={newPrestation.bookingUrl}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, bookingUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="https://calendly.com/..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Image URL</span>
              <input
                type="text"
                value={newPrestation.imageUrl}
                onChange={(e) => setNewPrestation((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="https://..."
              />
            </label>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={newPrestation.isPromo}
                  onChange={(e) => setNewPrestation((prev) => ({ ...prev, isPromo: e.target.checked }))}
                  className="h-4 w-4 text-rose-500 rounded border-gray-300"
                />
                Mise en promo
              </label>
            </div>

            {newPrestation.isPromo && (
              <>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Prix promo</span>
                  <input
                    type="text"
                    value={newPrestation.editPromoPrice}
                    onChange={(e) => setNewPrestation((prev) => ({ ...prev, editPromoPrice: formatPrice(e.target.value) }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="30"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Libellé promo</span>
                  <input
                    type="text"
                    value={newPrestation.promoLabel}
                    onChange={(e) => setNewPrestation((prev) => ({ ...prev, promoLabel: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="-10€ spéciale été"
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="xl:col-span-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition disabled:opacity-60"
            >
              {isSubmitting ? 'Création...' : 'Ajouter la prestation'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-gray-500">Chargement des prestations...</p>
          ) : prestations.length === 0 ? (
            <p className="text-gray-500">Aucune prestation enregistrée.</p>
          ) : (
            prestations.map((prestation, index) => (
              <div key={prestation.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">{prestation.title}</h3>
                      {prestation.icon && (
                        <span className="text-2xl">{prestation.icon}</span>
                      )}
                      {prestation.isPromo && (
                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                          En promotion
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{prestation.description || 'Pas de description.'}</p>
                    <p className="text-sm text-gray-500">Réservation : {prestation.bookingUrl || 'non configurée'}</p>
                    <p className="text-sm text-gray-500">Image : {prestation.imageUrl || 'non configurée'}</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(prestation.id, 'up')}
                        disabled={index === 0 || reorderLoadingId !== null}
                        title="Monter"
                        className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition disabled:opacity-40"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(prestation.id, 'down')}
                        disabled={index === prestations.length - 1 || reorderLoadingId !== null}
                        title="Descendre"
                        className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition disabled:opacity-40"
                      >
                        ▼
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(prestation.id)}
                      disabled={deleteLoadingId === prestation.id}
                      className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition disabled:opacity-60"
                    >
                      {deleteLoadingId === prestation.id ? 'Suppression...' : 'Supprimer'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(prestation.id)}
                      disabled={updateLoadingId === prestation.id}
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition disabled:opacity-60"
                    >
                      {updateLoadingId === prestation.id ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Titre</span>
                    <input
                      type="text"
                      value={prestation.title}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, title: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Prix</span>
                    <input
                      type="text"
                      value={prestation.editPrice}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, editPrice: formatPrice(e.target.value) } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Description</span>
                    <textarea
                      value={prestation.description || ''}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, description: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      rows={3}
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Points inclus (un par ligne)</span>
                    <textarea
                      value={prestation.featuresText}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, featuresText: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      rows={3}
                      placeholder={'Durée : 2-3 semaines\nFinition brillante impeccable'}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Libellé du prix</span>
                    <input
                      type="text"
                      value={prestation.priceLabel || ''}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, priceLabel: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Icône</span>
                    <input
                      type="text"
                      value={prestation.icon || ''}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, icon: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">URL de réservation</span>
                    <input
                      type="text"
                      value={prestation.bookingUrl || ''}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, bookingUrl: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Image URL</span>
                    <input
                      type="text"
                      value={prestation.imageUrl || ''}
                      onChange={(e) =>
                        setPrestations((prev) => prev.map((item) =>
                          item.id === prestation.id ? { ...item, imageUrl: e.target.value } : item
                        ))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </label>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={prestation.isPromo}
                        onChange={(e) =>
                          setPrestations((prev) => prev.map((item) =>
                            item.id === prestation.id ? { ...item, isPromo: e.target.checked } : item
                          ))
                        }
                        className="h-4 w-4 text-rose-500 rounded border-gray-300"
                      />
                      Promotion active
                    </label>
                  </div>

                  {prestation.isPromo && (
                    <>
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Prix promo</span>
                        <input
                          type="text"
                          value={prestation.editPromoPrice}
                          onChange={(e) =>
                            setPrestations((prev) => prev.map((item) =>
                              item.id === prestation.id ? { ...item, editPromoPrice: formatPrice(e.target.value) } : item
                            ))
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Libellé promo</span>
                        <input
                          type="text"
                          value={prestation.promoLabel || ''}
                          onChange={(e) =>
                            setPrestations((prev) => prev.map((item) =>
                              item.id === prestation.id ? { ...item, promoLabel: e.target.value } : item
                            ))
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
