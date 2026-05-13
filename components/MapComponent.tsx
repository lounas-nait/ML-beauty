'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    L: any;
  }
}

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.L && mapRef.current && !mapInstanceRef.current) {
      // Coordonnées de Chessy Val d'Europe
      const chessyCoords: [number, number] = [48.8698, 2.7836];

      // Créer la carte
      const map = window.L.map(mapRef.current).setView(chessyCoords, 11);

      // Ajouter la couche OpenStreetMap
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Ajouter un marqueur pour Chessy Val d'Europe
      const marker = window.L.marker(chessyCoords).addTo(map);
      marker.bindPopup('<b>ML Beauty</b><br>Zone de Chessy Val d\'Europe').openPopup();

      // Ajouter un cercle de 15km de rayon
      window.L.circle(chessyCoords, {
        color: '#e11d48', // rose-600
        fillColor: '#fecdd3', // rose-200
        fillOpacity: 0.3,
        radius: 15000, // 15km en mètres
        weight: 2
      }).addTo(map);

      // Ajouter une légende
      const legend = window.L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = window.L.DomUtil.create('div', 'legend bg-white p-3 rounded shadow');
        div.innerHTML = `
          <div class="text-sm">
            <div class="flex items-center mb-2">
              <div class="w-4 h-4 bg-rose-500 rounded-full mr-2"></div>
              <span>Zone de déplacement (15km)</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>ML Beauty</span>
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(map);

      mapInstanceRef.current = map;

      // Cleanup function
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }

    return undefined;
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-96 rounded-xl overflow-hidden shadow-lg"
      style={{ minHeight: '400px' }}
    />
  );
}