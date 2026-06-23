'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Connexion impossible.');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Erreur réseau, réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-rose-100"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Espace admin</h1>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</p>
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Mot de passe</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition disabled:opacity-60"
        >
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
