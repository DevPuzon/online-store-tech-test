import { CircleX } from 'lucide-react';
import { Button } from '../field/button';
export interface OrderConfirmationModalProps {
   onClose: () => void;
}

export const OrderConfirmationModal = ({ onClose }: OrderConfirmationModalProps) => {
   return (
      <>
         <div className="fixed inset-0 bg-black/50 z-40 top-[57px]" onClick={onClose} />
         <div className="fixed inset-x-0 top-[57px] z-50 bg-white rounded-b-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
               <h2 className="text-xl font-bold">Order Confirmation</h2>
               <CircleX className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="p-8 flex justify-center">
               <p className="text-2xl font-bold">Thank you for your order!</p>
            </div>
            <div className="p-4">
               <Button className="w-full" theme="primary" onClick={onClose}>
                  Close
               </Button>
            </div>
         </div>
      </>
   );
};
