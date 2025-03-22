'use client';

import type React from 'react';
import { ChatBot } from '@/components/ChatBot/ChatBot';
import { GoogleMap } from '@/components/GoogleMap/GoogleMap';
import { SearchResults } from '@/components/SearchResults/SearchResults';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, MapPin, Minus, Navigation, Plane, Plus, Search, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    google: {
      maps: {
        Marker: any;
        Animation: any;
        SymbolPath: any;
      };
    };
  }
}

export function MapHero() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [center] = useState({ lat: 30.3753, lng: 69.3451 });
  const [zoom] = useState(6);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = () => {
    // Reset any previous error
    setSearchError(null);

    // Validate that location is provided
    if (!location.trim()) {
      setSearchError('Please enter a destination to search for travel options.');
      return;
    }

    setShowSearchResults(true);
  };

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || zoom) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || zoom) - 1);
    }
  };

  const handleMapSearch = () => {
    if (searchQuery && mapRef.current && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          mapRef.current?.setCenter(location);
          mapRef.current?.setZoom(10);

          // Add a marker at the searched location
          window.google.maps.Marker({
            position: location,
            map: mapRef.current,
            animation: window.google.maps.Animation.DROP,
          });
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMapSearch();
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation && mapRef.current && window.google) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current?.setCenter(pos);
          mapRef.current?.setZoom(12);

          // Add a marker at the user's location
          window.google.maps.Marker({
            position: pos,
            map: mapRef.current,
            animation: window.google.maps.Animation.DROP,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });
        },
        () => {
          // eslint-disable-next-line no-alert
          alert('Error: The Geolocation service failed.');
        },
      );
    } else {
      // eslint-disable-next-line no-alert
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  };

  return (
    <div className="relative no-scrollbar w-full h-[calc(100vh-100px)] overflow-auto flex justify-center items-center">
      {/* Background pattern with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-100 opacity-70"></div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300 opacity-20 animate-float"
        style={{ animationDelay: '0s' }}
      >
      </div>
      <div
        className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-300 opacity-20 animate-float"
        style={{ animationDelay: '0.5s' }}
      >
      </div>
      <div
        className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-blue-300 opacity-20 animate-float"
        style={{ animationDelay: '1s' }}
      >
      </div>

      {/* Map container */}
      <div className="relative w-[75%] h-full z-10  ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-auto"
        >
          {/* <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"> */}
          {/* <Compass className="h-5 w-5 text-emerald-600" /> */}
          {/* <h1 className="text-lg font-bold travel-gradient-text">Discover Pakistan</h1> */}
          {/* </div> */}
        </motion.div>

        {/* Map search bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute  top-13 left-50 transform -translate-x-1/2 z-20 w-80"
        >
          <div className="relative flex  ">
            <Input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search location on map"
              className="pr-10 bg-white/90 backdrop-blur-sm rounded-full pl-4 h-11 shadow-md border-0 focus-visible:ring-emerald-500"
            />
            <Button
              onClick={handleMapSearch}
              size="icon"
              className="absolute right-0 h-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>

        {/* Real interactive map */}
        <div className="rounded-2xl overflow-hidden shadow-xl m-4 h-[calc(100%-8rem)]">
          <GoogleMap center={center} zoom={zoom} onLoad={handleMapLoad} />
        </div>

        {/* Map controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute right-8 top-1/3 transform -translate-y-1/2 z-20 flex flex-col gap-2"
        >
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm rounded-full h-10 w-10 shadow-md hover:bg-emerald-50"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4 text-emerald-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm rounded-full h-10 w-10 shadow-md hover:bg-emerald-50"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4 text-emerald-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm rounded-full h-10 w-10 shadow-md hover:bg-emerald-50"
            onClick={handleMyLocation}
          >
            <Navigation className="h-4 w-4 text-emerald-700" />
          </Button>
        </motion.div>
        {/* Error notification */}
        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-44 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-3xl"
          >
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md" role="alert">
              <div className="flex items-center">
                <X className="h-5 w-5 mr-2" />
                <span className="block sm:inline">{searchError}</span>
              </div>
              <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSearchError(null)} type="button">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Search form - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className=" z-20 glass-card p-4 border rounded-4xl shadow-xl w-[90%] mx-[50px] my-[-80px] "
        >
          <div className=" flex flex-col justify-center w-full ">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-gray-800">Plan Your Journey</h2>
            </div>

            <div className="flex justify-center gap-9 w-full">
              <div className="flex flex-col bg-white/80 rounded-lg p-3 shadow-sm transition-all hover:shadow-md w-full md:w-auto">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-medium text-gray-700">Destination</p>
                </div>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (searchError) {
                      setSearchError(null);
                    }
                  }}
                  placeholder="Where to?"
                  className="border-0 p-0 w-[220px] h-auto focus-visible:ring-0 text-base bg-transparent"
                />
              </div>

              <div className="flex flex-col bg-white/80 rounded-lg p-3 shadow-sm transition-all hover:shadow-md w-full md:w-auto">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-medium text-gray-700">Budget</p>
                </div>
                <Input
                  type="text"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  placeholder="How much?"
                  className="border-0 p-0  w-[220px] h-auto focus-visible:ring-0 text-base bg-transparent"
                />
              </div>

              <div className="flex flex-col bg-white/80 rounded-lg p-3 shadow-sm transition-all hover:shadow-md md:w-auto">
                <div className="flex items-center gap-2 mb-1  w-[220px]">
                  <Calendar className="h-5 w-5 text-emerald-600 " />
                  <p className="text-sm font-medium text-gray-700">Travel Date</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left border-0 p-0 h-auto focus-visible:ring-0 text-base" type="button">
                      {date ? format(date, 'PPP') : 'Select date'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={handleSearch}
                className="travel-gradient-secondary text-black font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all mt-[12px]"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Adventures
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Support Bot Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setShowChatBot(!showChatBot)}
          className="rounded-full w-16 h-16 travel-gradient p-0 shadow-lg hover:shadow-xl animate-pulse-glow"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl">💬</span>
            <span className="text-[10px] mt-1 text-white font-medium">Chat</span>
          </div>
        </Button>
        {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
      </motion.div>

      {/* Search Results Popup */}
      {showSearchResults && (
        <SearchResults
          onClose={() => setShowSearchResults(false)}
          location={location}
          date={date ? format(date, 'PPP') : 'Any date'}
          budget={budget || 'Any budget'}
        />
      )}
    </div>
  );
}
