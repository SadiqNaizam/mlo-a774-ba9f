import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onQuantityChange: (id: string | number, newQuantity: number) => void;
  onRemove: (id: string | number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onQuantityChange,
  onRemove,
}) => {
  console.log(`CartItem loaded for: ${name}`);

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const lineItemTotal = (price * quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between py-4 px-2 border-b last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={imageUrl || 'https://via.placeholder.com/80'}
          alt={name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <p className="font-semibold text-base sm:text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 border rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-bold text-center w-6 text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Total Price */}
        <p className="font-semibold w-16 sm:w-20 text-right text-base">${lineItemTotal}</p>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-muted-foreground hover:text-destructive"
          aria-label={`Remove ${name} from cart`}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;