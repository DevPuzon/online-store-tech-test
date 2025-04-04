import { Star } from 'lucide-react';

export interface ReviewStarsProps {
   rating: number;
}

export const ReviewStars = ({ rating }: ReviewStarsProps) => {
   return (
      <div className="flex items-center gap-2">
         <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
               <Star
                  key={index}
                  className="w-4 h-4"
                  style={{ color: index < rating ? '#ffc700' : '#d1d5db' }}
                  fill="currentColor"
               />
            ))}
         </div>
         <p style={{ color: '#707784' }}>{`(${rating}/5)`}</p>
      </div>
   );
};
