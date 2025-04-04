import { create } from 'zustand';
import { Product } from '../types/product.types';
import { getProducts } from '../services/product.service';

export const useProducts = create<{
   products: Product[];
   loading: boolean;
   initProducts: () => Promise<void>;
   setProducts: (products: Product[]) => void;
}>((set) => ({
   loading: false,
   products: [],
   initProducts: async () => {
      set({ loading: true });
      // Demo only: Adding artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const products = await getProducts();
      set({ products });
      set({ loading: false });
   },
   setProducts: (products: Product[]) => set({ products }),
}));
