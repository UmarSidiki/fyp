'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useState } from 'react';

type GoogleMapProps = {
  center: { lat: number; lng: number };
  zoom: number;
  onLoad?: (map: google.maps.Map) => void;
};

export function GoogleMap({ center, zoom, onLoad }: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a global variable to track if the API is already loading or loaded
    if (!(window as any).googleMapsInitialized) {
      ;(window as any).googleMapsInitialized = true;

      const initMap = async () => {
        try {
          setLoading(true);

          // Initialize the Google Maps loader
          const loader = new Loader({
            apiKey: '', // In a real app, you would use your API key here
            version: 'weekly',
            libraries: ['places'],
          });

          // Load the Google Maps API
          const google = await loader.load();

          // Create a new map instance
          const mapInstance = new google.maps.Map(document.getElementById('google-map') as HTMLElement, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: false, // We'll use our custom zoom controls
            styles: [
              {
                featureType: 'administrative.country',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#4a8594' }],
              },
              {
                featureType: 'administrative.province',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#4a8594' }, { visibility: 'on' }, { weight: 1.5 }],
              },
              {
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }],
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry.fill',
                stylers: [{ color: '#e8f7ed' }],
              },
              {
                featureType: 'landscape.natural.landcover',
                elementType: 'geometry.fill',
                stylers: [{ color: '#d4e8c1' }],
              },
              {
                featureType: 'landscape.natural.terrain',
                elementType: 'geometry.fill',
                stylers: [{ color: '#d4e8c1' }],
              },
              {
                featureType: 'poi',
                elementType: 'geometry.fill',
                stylers: [{ color: '#c5e8b3' }],
              },
              {
                featureType: 'poi.attraction',
                elementType: 'geometry.fill',
                stylers: [{ color: '#d4e8c1' }],
              },
              {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.government',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.medical',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{ color: '#c5e8b3' }, { visibility: 'on' }],
              },
              {
                featureType: 'poi.place_of_worship',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.school',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'poi.sports_complex',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [{ color: '#ffffff' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#e9e9e9' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#b1dcfa' }],
              },
            ],
          });

          // Add a default marker for Pakistan
          new google.maps.Marker({
            position: { lat: 30.3753, lng: 69.3451 },
            map: mapInstance,
            title: 'Pakistan',
            animation: google.maps.Animation.DROP,
          });

          setMap(mapInstance);
          if (onLoad) {
            onLoad(mapInstance);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error loading Google Maps:', err);
          setError('Failed to load Google Maps. Please try again later.');
          setLoading(false);
        }
      };

      initMap();
    } else {
      // If the API is already loading or loaded, just wait for it
      const checkIfGoogleIsReady = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkIfGoogleIsReady);

          try {
            // Create a new map instance
            const mapInstance = new window.google.maps.Map(document.getElementById('google-map') as HTMLElement, {
              center,
              zoom,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: false, // We'll use our custom zoom controls
              styles: [
                {
                  featureType: 'administrative.country',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#4a8594' }],
                },
                {
                  featureType: 'administrative.province',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#4a8594' }, { visibility: 'on' }, { weight: 1.5 }],
                },
                {
                  featureType: 'landscape',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#f5f5f5' }],
                },
                {
                  featureType: 'landscape.natural',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#e8f7ed' }],
                },
                {
                  featureType: 'landscape.natural.landcover',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#d4e8c1' }],
                },
                {
                  featureType: 'landscape.natural.terrain',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#d4e8c1' }],
                },
                {
                  featureType: 'poi',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#c5e8b3' }],
                },
                {
                  featureType: 'poi.attraction',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#d4e8c1' }],
                },
                {
                  featureType: 'poi.business',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi.government',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi.medical',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#c5e8b3' }, { visibility: 'on' }],
                },
                {
                  featureType: 'poi.place_of_worship',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi.school',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'poi.sports_complex',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#ffffff' }],
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#e9e9e9' }],
                },
                {
                  featureType: 'water',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#b1dcfa' }],
                },
              ],
            });

            // Add a default marker for Pakistan
            new window.google.maps.Marker({
              position: { lat: 30.3753, lng: 69.3451 },
              map: mapInstance,
              title: 'Pakistan',
              animation: window.google.maps.Animation.DROP,
            });

            setMap(mapInstance);
            if (onLoad) {
              onLoad(mapInstance);
            }
            setLoading(false);
          } catch (err) {
            console.error('Error initializing Google Maps:', err);
            setError('Failed to initialize Google Maps. Please try again later.');
            setLoading(false);
          }
        }
      }, 100);

      // Clean up interval if component unmounts
      return () => clearInterval(checkIfGoogleIsReady);
    }
  }, [center, zoom, onLoad]);

  return (
    <div className="w-full h-full ">
      <div id="google-map" className="w-full h-full"></div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-emerald-700 font-medium">Loading your adventure map...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Map Error</h3>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="travel-gradient text-white rounded-full px-4 py-2 font-medium"
              >
                Retry Loading Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleMap;
