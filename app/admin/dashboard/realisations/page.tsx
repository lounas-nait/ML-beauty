'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import { MAX_PHOTOS_PER_REALISATION, MAX_VIDEOS_PER_REALISATION } from '@/lib/realisations';

interface AdminMedia {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  order: number;
}

interface AdminRealisation {
  id: string;
  title: string;
  category: string;
  media: AdminMedia[];
  createdAt: string;
}

const BASE_CATEGORIES = GALLERY_CATEGORIES.filter((c) => c !== 'Toutes');

export default function AdminRealisationsPage() {
  const [realisations, setRealisations] = useState<AdminRealisation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photosInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const addMediaInputRef = useRef<HTMLInputElement>(null);
  const [addMediaTarget, setAddMediaTarget] = useState<{ id: string; kind: 'IMAGE' | 'VIDEO' } | null>(null);

  const knownCategories = Array.from(new Set([...BASE_CATEGORIES, ...realisations.map((r) => r.category)])).sort();

  const loadRealisations = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/realisations');
    if (res.ok) {
      setRealisations(await res.json());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRealisations();
  }, []);

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setIsNewCategory(false);
    setNewCategory('');
    setPhotos([]);
    setVideo(null);
    if (photosInputRef.current) photosInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > MAX_PHOTOS_PER_REALISATION) {
      setError(`Maximum ${MAX_PHOTOS_PER_REALISATION} photos par réalisation.`);
      e.target.value = '';
      setPhotos([]);
      return;
    }
    setError('');
    setPhotos(files);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(e.target.files?.[0] || null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const finalCategory = isNewCategory ? newCategory.trim() : category;

    if (!title.trim()) {
      setError('Le titre est requis.');
      return;
    }
    if (!finalCategory) {
      setError('Choisissez ou créez une catégorie.');
      return;
    }
    if (photos.length === 0 && !video) {
      setError('Ajoutez au moins une photo ou une vidéo.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.set('title', title.trim());
      formData.set('category', finalCategory);
      photos.forEach((file) => formData.append('photos', file));
      if (video) formData.set('video', video);

      const res = await fetch('/api/admin/realisations', { method: 'POST', body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Impossible de créer la réalisation.');
        return;
      }

      resetForm();
      loadRealisations();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer définitivement cette réalisation et tous ses médias ?')) return;
    await fetch(`/api/admin/realisations/${id}`, { method: 'DELETE' });
    loadRealisations();
  };

  const handleDeleteMedia = async (mediaId: string) => {
    await fetch(`/api/admin/realisations/media/${mediaId}`, { method: 'DELETE' });
    loadRealisations();
  };

  const openAddMedia = (id: string, kind: 'IMAGE' | 'VIDEO') => {
    setAddMediaTarget({ id, kind });
    if (addMediaInputRef.current) {
      addMediaInputRef.current.accept = kind === 'IMAGE' ? 'image/*' : 'video/*';
      addMediaInputRef.current.click();
    }
  };

  const handleAddMediaFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !addMediaTarget) return;

    const formData = new FormData();
    formData.set('file', file);

    const res = await fetch(`/api/admin/realisations/${addMediaTarget.id}/media`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Impossible d'ajouter ce média.");
      return;
    }

    setAddMediaTarget(null);
    loadRealisations();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Réalisations & Galerie</h1>
          <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-rose-500 underline">
            ← Modération des avis
          </Link>
        </div>

        {/* Création */}
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ajouter une réalisation</h2>

          {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">{error}</p>}

          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Titre</span>
              <input
                type="text"
                required
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Ex: Semi-permanent rouge"
              />
            </label>

            <div className="block">
              <span className="text-sm font-medium text-gray-700">Catégorie</span>
              {!isNewCategory ? (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsNewCategory(true);
                      setCategory('');
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="">Choisir une catégorie</option>
                  {knownCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__new__">+ Nouvelle catégorie</option>
                </select>
              ) : (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nom de la nouvelle catégorie"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewCategory(false);
                      setNewCategory('');
                    }}
                    className="px-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-gray-700">
                Photos (1 à {MAX_PHOTOS_PER_REALISATION} max)
              </span>
              <input
                ref={photosInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-gray-700">
                Vidéo (optionnelle, {MAX_VIDEOS_PER_REALISATION} max)
              </span>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition disabled:opacity-60"
            >
              {isSubmitting ? 'Envoi...' : 'Publier cette réalisation'}
            </button>
          </form>
        </div>

        {/* Input caché pour ajout de média sur une réalisation existante */}
        <input
          ref={addMediaInputRef}
          type="file"
          className="hidden"
          onChange={handleAddMediaFile}
        />

        {/* Liste */}
        {isLoading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : realisations.length === 0 ? (
          <p className="text-gray-500">Aucune réalisation pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {realisations.map((r) => {
              const photoCount = r.media.filter((m) => m.type === 'IMAGE').length;
              const videoCount = r.media.filter((m) => m.type === 'VIDEO').length;

              return (
                <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">{r.title}</h3>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                        {r.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-sm font-bold px-4 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {[...r.media].sort((a, b) => a.order - b.order).map((m) => (
                      <div key={m.id} className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        {m.type === 'IMAGE' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.url} alt={r.title} className="w-full h-full object-cover" />
                        ) : (
                          <video src={m.url} className="w-full h-full object-cover" muted />
                        )}
                        <button
                          onClick={() => handleDeleteMedia(m.id)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs hover:bg-black/80"
                          aria-label="Supprimer ce média"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {photoCount < MAX_PHOTOS_PER_REALISATION && (
                      <button
                        onClick={() => openAddMedia(r.id, 'IMAGE')}
                        className="w-28 h-28 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-rose-400 hover:text-rose-500 text-sm flex flex-col items-center justify-center"
                      >
                        <span className="text-2xl">+</span>
                        Photo
                      </button>
                    )}

                    {videoCount < MAX_VIDEOS_PER_REALISATION && (
                      <button
                        onClick={() => openAddMedia(r.id, 'VIDEO')}
                        className="w-28 h-28 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-rose-400 hover:text-rose-500 text-sm flex flex-col items-center justify-center"
                      >
                        <span className="text-2xl">+</span>
                        Vidéo
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
