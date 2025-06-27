import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string | number, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  console.log(`MenuItemCard loaded for: ${name}`);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCartClick = () => {
    onAddToCart(id, quantity);
    toast.success(`${quantity} x ${name} added to your cart!`);
    // Optionally reset quantity to 1 after adding
    // setQuantity(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 bg-white w-full">
      <div className="sm:w-32 sm:h-32 w-full h-48 flex-shrink-0">
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-semibold text-gray-900">${price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-md">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDecreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleIncreaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCartClick} className="whitespace-nowrap">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;