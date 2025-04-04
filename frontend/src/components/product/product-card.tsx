import { Product } from '../../types/product.types';
import { ReviewStars } from '../review/review-stars';
import { Button } from '../field/button';
import { useCart } from '@/stores/useCart';
export interface ProductCardProps {
   product?: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
   const { addToCart } = useCart();

   const handleAddToCart = () => {
      if (product) {
         addToCart(product);
      }
   };

   if (!product) {
      return (
         <div>
            <div className="flex justify-center border border-gray-200 rounded-lg p-4">
               <div className="h-[350px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-col gap-3 mt-3 mb-4">
               <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
               <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
               </div>
               <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
         </div>
      );
   }

   return (
      <div>
         <div className="flex justify-center border border-gray-200 rounded-lg p-4">
            <img src={product.image} alt={product.title} className="h-[350px] rounded-lg" />
         </div>
         <div className="flex flex-col gap-3 mt-3 mb-4">
            <h3 className="font-bold" style={{ color: '#707784' }}>
               {product.title}
            </h3>
            <div className="flex justify-between">
               <p>${product.price}</p>
               <ReviewStars rating={product.rating.rate} />
            </div>
            <Button theme="primary" onClick={handleAddToCart}>
               Add to cart
            </Button>
         </div>
      </div>
   );
};
