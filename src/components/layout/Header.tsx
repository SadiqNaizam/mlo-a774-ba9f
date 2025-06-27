import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UtensilsCrossed, Search, User, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block text-lg">FlavorRush</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search for restaurants or dishes..." 
            className="w-full pl-10"
          />
        </div>
        
        {/* Action Icons */}
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <NavLink to="/user-profile">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </NavLink>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <NavLink to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              {/* Placeholder for cart item count */}
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                3
              </Badge>
              <span className="sr-only">Shopping Cart</span>
            </NavLink>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;