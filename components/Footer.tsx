import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-pink rounded-full flex items-center justify-center text-white text-lg">
                ✨
              </div>
              <span className="font-bold text-lg">MLbeauty</span>
            </div>
            <p className="text-gray-400 text-sm">
              Prothésiste ongulaire - Service haut de gamme à Chessy et alentours
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition">
                  Prestations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">Semi-Permanent</span>
              </li>
              <li>
                <span className="text-gray-400">Dépose Semi-Permanent</span>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold mb-4">Suivez-moi</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/mlbeauty_77?igsh=MW5oYXpiOXBneDdrYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-500 rounded-full flex items-center justify-center hover:shadow-lg transition text-white"
                aria-label="Instagram"
              >
                <img src="/logos/instagram.webp" alt="Instagram" />
              </a>
              <a
                href="https://tiktok.com/@mlbeauty_77?igsh=MW5oYXpiOXBneDdrYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-500 rounded-full flex items-center justify-center hover:shadow-lg transition text-white"
                aria-label="TikTok"
              >
                <img src="/logos/tiktok.webp" alt="TikTok" />
              </a>
            </div>
            <a
              href="https://calendly.com/lounas-nait960/semi-permanent-1h"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-pink text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition"
            >
              Réserver maintenant
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} MLbeauty. Tous droits réservés.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span>Service à domicile</span>
              <span>•</span>
              <span>Chessy et alentours</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
