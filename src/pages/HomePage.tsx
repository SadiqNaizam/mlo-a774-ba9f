import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Placeholder data for featured restaurants
const featuredRestaurants = [
  {
    slug: 'pizza-palace',
    name: 'Pizza Palace',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: 35,
  },
  {
    slug: 'burger-barn',
    name: 'Burger Barn',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800',
    cuisine: 'American',
    rating: 4.3,
    deliveryTime: 20,
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: 30,
  },
];

const categories = [
  'Pizza',
  'Sushi',
  'Burgers',
  'Italian',
  'Mexican',
  'Desserts',
  'Vegan',
  'Thai'
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-50 py-20 md:py-32">
          <div className="container max-w-screen-xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Your next meal, delivered fast.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover the best local restaurants and get your favorite food delivered to your door.
            </p>
            <form className="mt-8 max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What are you craving today?"
                  className="w-full pl-12 h-12 text-base"
                />
              </div>
              <Link to="/restaurant-listing">
                <Button size="lg" type="submit">Search</Button>
              </Link>
            </form>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-screen-xl">
            <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link key={category} to="/restaurant-listing" state={{ category: category }}>
                  <Badge className="px-4 py-2 text-sm font-semibold cursor-pointer transition-transform hover:scale-105 hover:bg-primary hover:text-primary-foreground" variant="outline">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-12 bg-gray-50">
          <div className="container max-w-screen-xl">
            <h2 className="text-2xl font-bold mb-8">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.slug} {...restaurant} />
              ))}
            </div>
            <div className="text-center mt-12">
               <Link to="/restaurant-listing">
                  <Button size="lg" variant="outline">View All Restaurants</Button>
               </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;