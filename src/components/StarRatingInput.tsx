import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  /** The total number of stars to display. */
  totalStars?: number;
  /** The initial rating value. */
  initialRating?: number;
  /** Callback function that is called when the rating changes. */
  onRatingChange?: (rating: number) => void;
  /** The size of the star icons in pixels. */
  size?: number;
  /** Optional additional class names for the container. */
  className?: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  size = 24,
  className,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  console.log('StarRatingInput loaded');

  const handleClick = (rate: number) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <Star
            key={starValue}
            size={size}
            className={cn(
              "cursor-pointer transition-colors duration-200",
              isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;