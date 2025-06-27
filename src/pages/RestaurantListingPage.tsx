import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Mock data for restaurant cards
const mockRestaurants = [
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    slug: 'guac-n-roll',
    name: 'Guac & Roll',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.8,
    deliveryTime: 20,
  },
  {
    slug: 'the-salsa-spot',
    name: 'The Salsa Spot',
    imageUrl: 'https://images.unsplash.com/photo-1627907222584-788751f09b8b?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Tex-Mex',
    rating: 4.2,
    deliveryTime: 35,
  },
  {
    slug: 'burrito-bliss',
    name: 'Burrito Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: 30,
  },
  {
    slug: 'nacho-average-place',
    name: 'Nacho Average Place',
    imageUrl: 'https://images.unsplash.com/photo-1599974558296-e2a2656d5815?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Tex-Mex',
    rating: 4.3,
    deliveryTime: 40,
  },
];

const cuisines = ['Mexican', 'Tex-Mex', 'Vegan', 'Fast Food', 'Latin'];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([50]);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const FilterSidebar = () => (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filters & Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="sort-by">Sort by</Label>
          <Select defaultValue="rating">
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
              <SelectItem value="a-z">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Cuisine</h3>
          <div className="space-y-2">
            {cuisines.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox id={cuisine.toLowerCase().replace(' ', '-')}/>
                <Label htmlFor={cuisine.toLowerCase().replace(' ', '-')} className="font-normal">{cuisine}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />
        
        <div>
           <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Price Range</h3>
            <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
           </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={setPriceRange}
            aria-label="Price range slider"
          />
        </div>

        <Button className="w-full" variant="secondary">Clear All Filters</Button>

      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-grow container max-w-screen-2xl py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-muted-foreground">Showing results for "Tacos"</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Filters - hidden on mobile, shown on lg+ */}
          <aside className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Restaurant Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : mockRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.slug} {...restaurant} />
                ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;