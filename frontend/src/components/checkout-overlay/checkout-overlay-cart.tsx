import { ShoppingCart } from 'lucide-react';
import { ProductCardMini } from '../product/product-card-mini';
import { useCart } from '@/stores/useCart';

export const CheckoutOverlayCart = () => {
   const { cart, totalCount } = useCart();
   return (
      <>
         {totalCount === 0 ? (
            <div className="flex flex-col items-center gap-4">
               <ShoppingCart className="w-48 h-48 text-gray-300" />
               <p className="text-gray-500">Your cart is empty</p>
            </div>
         ) : (
            <div className="flex flex-col gap-8">
               {cart.map((item, index) => (
                  <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0">
                     <ProductCardMini cartItem={item} />
                  </div>
               ))}
            </div>
         )}
      </>
   );
};
