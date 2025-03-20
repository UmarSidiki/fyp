'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

type LatLng = { lat: number; lng: number };

type GoogleMapProps = {
  center: LatLng;
  zoom: number;
  start?: string | LatLng;
  end?: string | LatLng;
  onRouteCalculated?: (distance: string, time: string) => void;
  onLoad?: (map: google.maps.Map) => void;
};

export function GoogleMap({ center, zoom, start, end, onRouteCalculated, onLoad }: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Initialize the map with Pakistan restriction
  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places'],
        });
        const google = await loader.load();

        // Define Pakistan's geographical bounds
        const pakistanBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(23.69, 60.87),
          new google.maps.LatLng(37.09, 77.84),
        );

        const mapInstance = new google.maps.Map(document.getElementById('google-map') as HTMLElement, {
          center,
          zoom,
          restriction: {
            latLngBounds: pakistanBounds,
            strictBounds: false,
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          scaleControl: false,
          rotateControl: false,
          panControl: false,
          styles: [
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#4a8594' }],
            },
            // Add more styles as needed
          ],
        });

        // Initialize DirectionsRenderer
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(mapInstance);
        directionsRendererRef.current = directionsRenderer;

        setMap(mapInstance);
        if (onLoad) {
          onLoad(mapInstance);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load the map. Please try again later.');
        setLoading(false);
      }
    };

    initMap();
  }, [center, zoom, onLoad]);

  // Calculate and display route when start and end are provided
  useEffect(() => {
    if (map && directionsRendererRef.current) {
      if (start && end) {
        const directionsService = new google.maps.DirectionsService();
        const request = {
          origin: typeof start === 'string' ? start : new google.maps.LatLng(start.lat, start.lng),
          destination: typeof end === 'string' ? end : new google.maps.LatLng(end.lat, end.lng),
          travelMode: google.maps.TravelMode.DRIVING, // Default to driving; can be made configurable
        };

        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(result);
            const route = result?.routes[0]?.legs[0];
            const distance = route?.distance?.text || 'Unknown';
            const time = route?.duration?.text || 'Unknown';
            if (onRouteCalculated) {
              onRouteCalculated(distance, time);
            }
          } else {
            console.error('Directions request failed:', status);
            // Optionally display an error to the user
          }
        });
      } else {
        // Clear the route if start or end is missing
        directionsRendererRef.current.setDirections(null);
      }
    }
  }, [map, start, end, onRouteCalculated]);

  return (
    <div className="w-full h-full relative">
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
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="travel-gradient text-white rounded-full px-4 py-2 font-medium"
            >
              Retry Loading Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleMap;
