'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (path: string): boolean => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.png"
            alt="MLbeauty logo"
            width={200}
            height={140}
          />
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`font-medium transition ${
              isActiveLink("/")
                ? "text-rose-500"
                : "text-gray-700 hover:text-rose-500"
            }`}
          >
            Accueil
          </Link>

          <Link
            href="/services"
            className={`font-medium transition ${
              isActiveLink("/services")
                ? "text-rose-500"
                : "text-gray-700 hover:text-rose-500"
            }`}
          >
            Prestations
          </Link>

          <Link
            href="/gallery"
            className={`font-medium transition ${
              isActiveLink("/gallery")
                ? "text-rose-500"
                : "text-gray-700 hover:text-rose-500"
            }`}
          >
            Galerie
          </Link>

          <Link
            href="/contact"
            className={`font-medium transition ${
              isActiveLink("/contact")
                ? "text-rose-500"
                : "text-gray-700 hover:text-rose-500"
            }`}
          >
            Contact
          </Link>

          <a
            href="https://calendly.com/lounas-nait960/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition"
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
        <div className="md:hidden border-t border-gray-200 px-4 py-4 flex flex-col gap-3 bg-white">

          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-rose-500 font-medium py-2"
          >
            Accueil
          </Link>

          <Link 
            href="/services" 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-rose-500 font-medium py-2"
          >
            Prestations
          </Link>

          <Link 
            href="/gallery" 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-rose-500 font-medium py-2"
          >
            Galerie
          </Link>

          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-rose-500 font-medium py-2"
          >
            Contact
          </Link>

          <a
            href="https://calendly.com/lounas-nait960/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium text-center block mt-2"
          >
            Réserver
          </a>

        </div>
      )}
    </nav>
  );
}