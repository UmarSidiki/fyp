/* eslint-disable react/no-array-index-key */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, DollarSign, Filter, MapPin, Star, X } from 'lucide-react';
import { useState } from 'react';

type SearchResultsProps = {
  onClose: () => void;
  location?: string;
  date?: string;
  budget?: string;
};

export function SearchResults({ onClose, location, date, budget }: SearchResultsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Mock search results
  const results = [
    {
      id: 1,
      title: 'Lahore City Tour',
      description: 'Explore the cultural heritage of Lahore with guided tours to historical sites.',
      price: '$120',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.8,
      reviews: 124,
      tags: ['Cultural', 'History'],
      featured: true,
    },
    {
      id: 2,
      title: 'Islamabad Adventure',
      description: 'Discover the beauty of Pakistan\'s capital with hiking and sightseeing.',
      price: '$150',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.6,
      reviews: 98,
      tags: ['Adventure', 'Nature'],
      featured: false,
    },
    {
      id: 3,
      title: 'Karachi Beach Getaway',
      description: 'Relax on the beautiful beaches of Karachi with luxury accommodations.',
      price: '$200',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.5,
      reviews: 156,
      tags: ['Beach', 'Relaxation'],
      featured: false,
    },
    {
      id: 4,
      title: 'Hunza Valley Expedition',
      description: 'Experience the breathtaking landscapes of Hunza Valley with local guides.',
      price: '$250',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.9,
      reviews: 203,
      tags: ['Mountains', 'Adventure'],
      featured: true,
    },
    {
      id: 5,
      title: 'Swat Valley Retreat',
      description: 'Enjoy the serene beauty of Swat Valley with comfortable accommodations.',
      price: '$180',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.7,
      reviews: 142,
      tags: ['Nature', 'Peaceful'],
      featured: false,
    },
    {
      id: 6,
      title: 'Multan Historical Tour',
      description: 'Discover the ancient city of Multan with its rich history and architecture.',
      price: '$130',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.4,
      reviews: 87,
      tags: ['History', 'Cultural'],
      featured: false,
    },
  ];

  // Filter results based on selected filter
  const filteredResults = selectedFilter ? results.filter(result => result.tags.includes(selectedFilter)) : results;

  // Get unique tags for filter options
  const allTags = Array.from(new Set(results.flatMap(result => result.tags)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center "
    >
      <div className="absolute inset-0 opacity-0.3 backdrop-blur-md "></div>
      <div className="container mx-auto py-6 px-4 h-[90vh] max-h-[800px] w-[95%] max-w-6xl bg-white rounded-xl shadow-2xl flex flex-col relative z-50 mt-20 sm:mt-16 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center mb-6 sm:mb-4  "
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full  hover:bg-gray-100 absolute top-4 left-4 "
          >
            <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4" />
          </Button>

          <div className="text-center rounded-full flex-1">
            <h2 className="text-5xlxl sm:text-xl font-bold travel-gradient-text ">Travel Experiences</h2>
            <div className="flex items-center justify-center gap-4 sm:gap-2 mt-2 text-sm sm:text-xs text-gray-500">
              {location && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 sm:h-2 sm:w-2" />
                  {location}
                </div>
              )}
              {date && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 sm:h-2 sm:w-2" />
                  {date}
                </div>
              )}
              {budget && (
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1 sm:h-2 sm:w-2" />
                  {budget}
                </div>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="opacity-0">
            <X className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-4"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-2">
            <Filter className="h-4 w-4 text-emerald-600" />
            <h3 className="font-medium sm:text-sm">Filter by Experience</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-1">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedFilter === tag ? 'default' : 'outline'}
                className={`cursor-pointer sm:text-xs ${
                  selectedFilter === tag ? 'bg-emerald-500 hover:bg-emerald-600' : 'hover:bg-emerald-50'
                }`}
                onClick={() => setSelectedFilter(selectedFilter === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedFilter && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-emerald-600 h-6 px-2 sm:h-5 sm:px-1 sm:text-[10px]"
                onClick={() => setSelectedFilter(null)}
              >
                Clear filter
              </Button>
            )}
          </div>
        </motion.div>

        <ScrollArea className="flex-1  overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="h-48 sm:h-40 overflow-hidden relative">
                    {/* <img
                      src={result.image || '/placeholder.svg'}
                      alt={result.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    /> */}
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-semibold flex items-center shadow-md">
                      <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                      {result.rating}
                    </div>
                    {result.featured && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2 sm:p-3">
                    <CardTitle className="text-lg sm:text-base">{result.title}</CardTitle>
                    <CardDescription className="sm:text-xs">{result.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 sm:p-3 pt-0">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {result.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50 text-xs sm:text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg sm:text-base font-bold travel-gradient-text">{result.price}</p>
                      <p className="text-sm sm:text-xs text-gray-500">
                        {result.reviews}
                        {' '}
                        reviews
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="sm:p-3">
                    <Button className="w-full travel-gradient-secondary text-black font-medium sm:py-1 sm:text-sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
