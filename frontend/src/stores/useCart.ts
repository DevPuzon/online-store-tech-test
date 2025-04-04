import { Cart } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { create } from 'zustand';

export const useCart = create<{
   cart: Cart[];
   totalPrice: number;
   totalCount: number;
   addToCart: (product: Product) => void;
   removeFromCart: (product: Product) => void;
   upsertCart: (product: Product, quantity: number) => void;
   clearCart: () => void;
}>((set) => {
   const calculateTotals = (cart: Cart[]) => ({
      totalPrice: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      totalCount: cart.reduce((sum, item) => sum + item.quantity, 0),
   });

   return {
      cart: [],
      totalPrice: 0,
      totalCount: 0,
      addToCart: (product: Product) =>
         set((state) => {
            const existingItem = state.cart.find((item) => item.product.id === product.id);
            let newCart;
            if (existingItem) {
               newCart = state.cart.map((item) =>
                  item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
               );
            } else {
               newCart = [...state.cart, { product, quantity: 1 }];
            }
            return { cart: newCart, ...calculateTotals(newCart) };
         }),
      removeFromCart: (product: Product) =>
         set((state) => {
            const newCart = state.cart.filter((item) => item.product.id !== product.id);
            return { cart: newCart, ...calculateTotals(newCart) };
         }),
      upsertCart: (product: Product, quantity: number) =>
         set((state) => {
            const existingItem = state.cart.find((item) => item.product.id === product.id);
            let newCart;
            if (existingItem) {
               if (quantity <= 0) {
                  newCart = state.cart.filter((item) => item.product.id !== product.id);
               } else {
                  newCart = state.cart.map((item) =>
                     item.product.id === product.id ? { ...item, quantity } : item
                  );
               }
            } else if (quantity > 0) {
               newCart = [...state.cart, { product, quantity }];
            } else {
               newCart = state.cart;
            }
            return { cart: newCart, ...calculateTotals(newCart) };
         }),
      clearCart: () => set({ cart: [], totalPrice: 0, totalCount: 0 }),
   };
});
