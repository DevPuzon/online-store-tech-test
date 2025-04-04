import { Trash2 } from 'lucide-react';
import { Cart } from '@/types/cart.types';
import { useCart } from '@/stores/useCart';
export interface ProductCardMiniProps {
   cartItem: Cart;
}

export const ProductCardMini = ({ cartItem }: ProductCardMiniProps) => {
   const { upsertCart, removeFromCart } = useCart();
   return (
      <div className="flex gap-4">
         <div className="w-[96px] h-[87px] flex-shrink-0 flex items-center justify-center order border-gray-200 rounded-lg ">
            <img
               src={cartItem.product.image}
               alt={cartItem.product.title}
               className="h-full rounded-lg"
            />
         </div>
         <div className="flex flex-col gap-2 w-full justify-between">
            <div className="flex justify-between">
               <h3 className="font-bold w-[173px]" style={{ color: '#707784' }}>
                  {cartItem.product.title}
               </h3>
               <Trash2
                  className="w-[25px] h-[25px] cursor-pointer"
                  onClick={() => removeFromCart(cartItem.product)}
               />
            </div>
            <div className="flex justify-between">
               <p>${cartItem.product.price}</p>
               <input
                  type="text"
                  pattern="[0-9]*"
                  placeholder={cartItem.quantity.toString()}
                  className="w-[60px] h-[30px] border border-gray-200 rounded-lg text-center"
                  onChange={(e) => {
                     const value = e.target.value.replace(/[^0-9]/g, '');
                     if (value) {
                        upsertCart(cartItem.product, parseInt(value));
                     }
                  }}
               />
            </div>
         </div>
      </div>
   );
};
