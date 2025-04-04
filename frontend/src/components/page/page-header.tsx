'use client';
import { Zap, ShoppingBag } from 'lucide-react';
import { useCart } from '@/stores/useCart';
import { useState } from 'react';
import { CartModal } from '../modal/cart-modal';
import { CheckoutModal } from '../modal/checkout-modal';
import { OrderConfirmationModal } from '../modal/order-confirmation-modal';
export const PageHeader = () => {
   const { cart, totalCount } = useCart();
   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
   const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
   const [isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen] = useState(false);
   const handleCartClick = () => {
      setIsCartModalOpen(!isCartModalOpen);
   };
   const handleCheckoutClick = () => {
      setIsCheckoutModalOpen(!isCheckoutModalOpen);
   };
   const handleOrderConfirmationClick = () => {
      setIsOrderConfirmationModalOpen(!isOrderConfirmationModalOpen);
   };

   return (
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 shadow-md z-100 bg-white">
         <Zap style={{ color: '#4F46E5' }} fill="currentColor" />
         <div
            onClick={handleCartClick}
            className="flex items-center gap-2"
            style={{ color: '#707784' }}
         >
            <ShoppingBag />
            <p key={totalCount} className="animate-[bounce_0.5s_ease-in-out]">
               {totalCount}
            </p>
         </div>
         {isCartModalOpen && (
            <CartModal
               onClose={() => setIsCartModalOpen(false)}
               onCheckoutClick={() => {
                  setIsCartModalOpen(false);
                  setIsCheckoutModalOpen(true);
               }}
            />
         )}
         {isCheckoutModalOpen && (
            <CheckoutModal
               onClose={() => setIsCheckoutModalOpen(false)}
               onConfirmationClick={() => {
                  setIsCheckoutModalOpen(false);
                  setIsOrderConfirmationModalOpen(true);
               }}
            />
         )}
         {isOrderConfirmationModalOpen && (
            <OrderConfirmationModal onClose={() => setIsOrderConfirmationModalOpen(false)} />
         )}
      </div>
   );
};
