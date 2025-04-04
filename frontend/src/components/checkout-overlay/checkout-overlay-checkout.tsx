'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../field/button';
import { useCart } from '@/stores/useCart';
import { CheckoutOverlayCart } from './checkout-overlay-cart';
const checkoutSchema = z.object({
   email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
   name: z.string().min(2, 'Name must be at least 2 characters long').min(1, 'Name is required'),
   address: z.string().min(5, 'Please enter a valid address').min(1, 'Address is required'),
   cardNumber: z
      .string()
      .regex(/^\d{16}$/, 'Please enter a valid 16-digit card number')
      .min(1, 'Card number is required'),
   cardName: z
      .string()
      .min(2, 'Please enter the name on your card')
      .min(1, 'Card name is required'),
   expiry: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Please enter a valid expiry date (MM/YY)')
      .min(1, 'Expiry date is required'),
   cvc: z
      .string()
      .regex(/^\d{3,4}$/, 'Please enter a valid CVC')
      .min(1, 'CVC is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface CheckoutOverlayCheckoutProps {
   onConfirmationClick: () => void;
}

export const CheckoutOverlayCheckout = ({ onConfirmationClick }: CheckoutOverlayCheckoutProps) => {
   const { totalPrice, clearCart } = useCart();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CheckoutFormData>({
      resolver: zodResolver(checkoutSchema),
   });

   const onSubmit = (data: CheckoutFormData) => {
      console.log('Form submitted:', data);
      clearCart();
      onConfirmationClick();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-6">
         <div className="space-y-4">
            <h2 className="text-lg font-bold">Shipping Information</h2>
            <div className="space-y-2">
               <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
               />
               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
               <input
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
               />
               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
               <input
                  type="text"
                  placeholder="Address"
                  {...register('address')}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
               />
               {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
         </div>

         <div className="space-y-4">
            <h2 className="text-lg font-bold">Payment Information</h2>
            <div className="space-y-2">
               <input
                  type="text"
                  placeholder="Card Number"
                  {...register('cardNumber')}
                  maxLength={16}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
               />
               {errors.cardNumber && (
                  <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
               )}
            </div>
            <div className="space-y-2">
               <input
                  type="text"
                  placeholder="Name on Card"
                  {...register('cardName')}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
               />
               {errors.cardName && (
                  <p className="text-red-500 text-sm">{errors.cardName.message}</p>
               )}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <input
                     type="text"
                     placeholder="MM/YY"
                     {...register('expiry')}
                     maxLength={5}
                     className="w-full p-2 border border-gray-200 rounded-lg"
                     required
                  />
                  {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
               </div>
               <div className="space-y-2">
                  <input
                     type="text"
                     placeholder="CVC"
                     {...register('cvc')}
                     maxLength={4}
                     className="w-full p-2 border border-gray-200 rounded-lg"
                     required
                  />
                  {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc.message}</p>}
               </div>
            </div>
         </div>
         <CheckoutOverlayCart />
         <h1 className="text-lg font-bold">Order Summary: ${totalPrice}</h1>

         <Button className="w-full" theme="success" type="submit">
            Confirm Order
         </Button>
      </form>
   );
};
