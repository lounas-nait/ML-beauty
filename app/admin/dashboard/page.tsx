'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  screenshotUrl: string | null;
  platform: 'GOOGLE' | 'INSTAGRAM' | 'TIKTOK' | 'DIRECT';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  source: 'CLIENT' | 'ADMIN';
  createdAt: string;
}

const MAX_SCREENSHOT_SIZE = 4 * 1024 * 1024; // 4 Mo

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const PLATFORM_LABEL: Record<AdminReview['platform'], string> = {
  GOOGLE: 'Google',
  INSTAGRAM: 'Instagram',
  TIKTOK: 'TikTok',
  DIRECT: 'Direct',
};

const TABS: { key: AdminReview['status']; label: string }[] = [
  { key: 'PENDING', label: 'En attente' },
  { key: 'APPROVED', label: 'Publiés' },
  { key: 'REJECTED', label: 'Rejetés' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [activeTab, setActiveTab] = useState<AdminReview['status']>('PENDING');
  const [isLoading, setIsLoading] = useState(true);
  const [importForm, setImportForm] = useState({ name: '', rating: 5, comment: '', platform: 'INSTAGRAM' as AdminReview['platform'] });
  const [importMode, setImportMode] = useState<'TEXT' | 'SCREENSHOT'>('TEXT');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [importError, setImportError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const loadReviews = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/reviews');
    if (res.ok) {
      setReviews(await res.json());
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleStatusChange = async (id: string, status: AdminReview['status']) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer définitivement cet avis ?')) return;
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    loadReviews();
  };

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setScreenshotPreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImportError('Le fichier doit être une image.');
      e.target.value = '';
      setScreenshotPreview(null);
      return;
    }

    if (file.size > MAX_SCREENSHOT_SIZE) {
      setImportError('La capture est trop volumineuse (max 4 Mo).');
      e.target.value = '';
      setScreenshotPreview(null);
      return;
    }

    setImportError('');
    setScreenshotPreview(await fileToBase64(file));
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');

    if (importMode === 'SCREENSHOT' && !screenshotPreview) {
      setImportError('Sélectionnez une image de capture d’écran.');
      return;
    }

    setIsImporting(true);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: importForm.name,
          rating: importForm.rating,
          platform: importForm.platform,
          comment: importMode === 'TEXT' ? importForm.comment : '',
          screenshotUrl: importMode === 'SCREENSHOT' ? screenshotPreview : '',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setImportError(data.error || "Impossible d'ajouter l'avis.");
        return;
      }

      setImportForm({ name: '', rating: 5, comment: '', platform: 'INSTAGRAM' });
      setScreenshotPreview(null);
      loadReviews();
    } finally {
      setIsImporting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filteredReviews = reviews.filter((r) => r.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modération des avis</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/admin/dashboard/prestations" className="text-sm text-gray-600 hover:text-rose-500 underline">
              Prestations →
            </Link>
            <Link href="/admin/dashboard/realisations" className="text-sm text-gray-600 hover:text-rose-500 underline">
              Réalisations & Galerie →
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-rose-500 underline"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Import manuel (Instagram, etc.) */}
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ajouter un avis reçu hors site (Instagram, DM...)</h2>

          {importError && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">{importError}</p>
          )}

          <form onSubmit={handleImport} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Nom de la cliente</span>
              <input
                type="text"
                required
                maxLength={80}
                value={importForm.name}
                onChange={(e) => setImportForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Plateforme</span>
              <select
                value={importForm.platform}
                onChange={(e) => setImportForm((f) => ({ ...f, platform: e.target.value as AdminReview['platform'] }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="INSTAGRAM">Instagram</option>
                <option value="TIKTOK">TikTok</option>
                <option value="GOOGLE">Google</option>
                <option value="DIRECT">Direct</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Note</span>
              <select
                value={importForm.rating}
                onChange={(e) => setImportForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </label>

            <div className="md:col-span-2">
              <span className="text-sm font-medium text-gray-700">Type d'avis</span>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setImportMode('TEXT')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition ${
                    importMode === 'TEXT' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ✍️ Texte
                </button>
                <button
                  type="button"
                  onClick={() => setImportMode('SCREENSHOT')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition ${
                    importMode === 'SCREENSHOT' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  📸 Capture d'écran
                </button>
              </div>
            </div>

            {importMode === 'TEXT' ? (
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Commentaire</span>
                <textarea
                  required
                  maxLength={1000}
                  rows={3}
                  value={importForm.comment}
                  onChange={(e) => setImportForm((f) => ({ ...f, comment: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </label>
            ) : (
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Capture d'écran (conversation Instagram, etc.)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                {screenshotPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={screenshotPreview}
                    alt="Aperçu de la capture"
                    className="mt-3 max-h-64 rounded-lg border border-gray-200"
                  />
                )}
              </label>
            )}

            <button
              type="submit"
              disabled={isImporting}
              className="md:col-span-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition disabled:opacity-60"
            >
              {isImporting ? 'Ajout...' : "Publier cet avis"}
            </button>
          </form>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                activeTab === tab.key ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {tab.label} ({reviews.filter((r) => r.status === tab.key).length})
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : filteredReviews.length === 0 ? (
          <p className="text-gray-500">Aucun avis dans cette catégorie.</p>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                      {PLATFORM_LABEL[review.platform]}
                    </span>
                    <span className="text-yellow-400">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {review.screenshotUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.screenshotUrl}
                    alt={`Capture d'écran de l'avis de ${review.name}`}
                    className="max-h-72 rounded-lg border border-gray-200 mb-4"
                  />
                ) : (
                  <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
                )}

                <div className="flex gap-2 flex-wrap">
                  {review.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleStatusChange(review.id, 'APPROVED')}
                      className="text-sm font-bold px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      Approuver
                    </button>
                  )}
                  {review.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleStatusChange(review.id, 'REJECTED')}
                      className="text-sm font-bold px-4 py-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200"
                    >
                      Rejeter
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-sm font-bold px-4 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
