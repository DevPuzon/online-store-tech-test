import { CircleX } from 'lucide-react';
import { CheckoutOverlayCheckout } from '../checkout-overlay/checkout-overlay-checkout';
export interface CheckoutModalProps {
   onClose: () => void;
   onConfirmationClick: () => void;
}

export const CheckoutModal = ({ onClose, onConfirmationClick }: CheckoutModalProps) => {
   return (
      <>
         <div className="fixed inset-0 bg-black/50 z-40 top-[57px]" onClick={onClose} />
         <div className="fixed inset-x-0 top-[57px] z-50 bg-white rounded-b-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
               <h2 className="text-xl font-bold">Checkout</h2>
               <CircleX className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
               <CheckoutOverlayCheckout onConfirmationClick={onConfirmationClick} />
            </div>
         </div>
      </>
   );
};
