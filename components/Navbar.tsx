'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-pink rounded-full flex items-center justify-center text-white font-bold text-lg">
              ✨
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              MLbeauty
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-rose-500 font-medium transition">
              Accueil
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-rose-500 font-medium transition">
              Prestations
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-rose-500 font-medium transition">
              Galerie
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-500 font-medium transition">
              Contact
            </Link>
            <a
              href="https://calendly.com/lounas-nait960/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-pink text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition"
            >
              Réserver
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-rose-500 font-medium">
              Accueil
            </Link>
            <Link href="/services" className="block py-2 text-gray-700 hover:text-rose-500 font-medium">
              Prestations
            </Link>
            <Link href="/gallery" className="block py-2 text-gray-700 hover:text-rose-500 font-medium">
              Galerie
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-rose-500 font-medium">
              Contact
            </Link>
            <a
              href="https://calendly.com/lounas-nait960/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-gradient-pink text-white px-6 py-2 rounded-full font-medium text-center hover:shadow-lg transition"
            >
              Réserver
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
