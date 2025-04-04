import { useCart } from '@/stores/useCart';
import { CircleX, ShoppingCart } from 'lucide-react';
import { CheckoutOverlayCart } from '../checkout-overlay/checkout-overlay-cart';
import { Button } from '@/components/field/button';
export interface CartModalProps {
   onClose: () => void;
   onCheckoutClick: () => void;
}

export const CartModal = ({ onClose, onCheckoutClick }: CartModalProps) => {
   const { totalCount } = useCart();
   return (
      <>
         <div className="fixed inset-0 bg-black/50 z-40 top-[57px]" onClick={onClose} />
         <div className="fixed inset-x-0 top-[57px] z-50 bg-white rounded-b-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
               <h2 className="text-xl font-bold">Cart</h2>
               <CircleX className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
               <CheckoutOverlayCart />
            </div>
            {totalCount > 0 && (
               <div className="p-4">
                  <Button className="w-full" theme="success" onClick={onCheckoutClick}>
                     Checkout
                  </Button>
               </div>
            )}
         </div>
      </>
   );
};
