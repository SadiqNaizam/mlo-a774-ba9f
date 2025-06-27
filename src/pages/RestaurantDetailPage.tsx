import React from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';

// shadcn/ui Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Lucide Icons
import { Star, MapPin, Clock } from 'lucide-react';

// Placeholder Data
const restaurantData = {
  name: "Taco Fiesta",
  cuisine: "Mexican",
  address: "123 Main St, Anytown, USA",
  rating: 4.5,
  reviewCount: 250,
  deliveryTime: "25-35 min",
  logoUrl: "https://placehold.co/100x100/f97316/white?text=TF",
  bannerUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2071&auto=format&fit=crop",
};

const menuData = [
  {
    category: "Appetizers",
    items: [
      {
        id: 1,
        name: "Chips & Guacamole",
        description: "Freshly made guacamole with crispy tortilla chips. Perfect for sharing!",
        price: 8.99,
        imageUrl: "https://images.unsplash.com/photo-1548483169-b37589178b64?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Street Corn (Elote)",
        description: "Grilled corn on the cob smothered in a creamy chili-lime sauce and cotija cheese.",
        price: 5.49,
        imageUrl: "https://images.unsplash.com/photo-1599942006322-9214154b0a1f?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Tacos",
    items: [
      {
        id: 3,
        name: "Carne Asada Tacos",
        description: "Two grilled steak tacos topped with onions, cilantro, and a side of salsa verde.",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1565299589934-1f74294a8f98?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Al Pastor Tacos",
        description: "Marinated pork tacos with pineapple, onions, and cilantro. A classic favorite.",
        price: 11.99,
        imageUrl: "https://images.unsplash.com/photo-1624322489253-8b7a695e5462?q=80&w=1964&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Baja Fish Tacos",
        description: "Crispy beer-battered fish, cabbage slaw, and chipotle aioli in a warm tortilla.",
        price: 13.49,
        imageUrl: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Burritos",
    items: [
        {
          id: 6,
          name: "California Burrito",
          description: "A huge burrito packed with carne asada, french fries, cheese, and guacamole.",
          price: 14.99,
          imageUrl: "https://images.unsplash.com/photo-1627907222143-b65aa5a39a73?q=80&w=2070&auto=format&fit=crop",
        },
    ],
  },
];


const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');

  // Handler for adding items to the cart. In a real app, this would update global state.
  const handleAddToCart = (id: string | number, quantity: number) => {
    // This is a mock function. It would typically dispatch an action to a cart context or state management library.
    console.log(`Added ${quantity} of item ${id} to cart.`);
    // A toast notification is already handled inside MenuItemCard.
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Restaurant Banner Section */}
        <section className="relative h-48 md:h-64 bg-gray-200">
          <img
            src={restaurantData.bannerUrl}
            alt={`${restaurantData.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </section>

        {/* Restaurant Info Section */}
        <section className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white">
              <AvatarImage src={restaurantData.logoUrl} alt={restaurantData.name} />
              <AvatarFallback>{restaurantData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <Badge variant="secondary" className="mb-2">{restaurantData.cuisine}</Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{restaurantData.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{restaurantData.rating}</span>
                  <span>({restaurantData.reviewCount}+ ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurantData.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurantData.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <Accordion type="multiple" defaultValue={[menuData[0].category]} className="w-full space-y-4">
            {menuData.map((category) => (
              <AccordionItem key={category.category} value={category.category} className="bg-white border rounded-lg p-2">
                <AccordionTrigger className="text-xl font-semibold px-4 py-2 hover:no-underline">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;