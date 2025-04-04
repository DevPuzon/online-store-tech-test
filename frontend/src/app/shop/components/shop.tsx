'use client';
import { useProducts } from '@/stores/useProduct';
import { useEffect } from 'react';
import { ProductCard } from '@/components/product/product-card';
export const Shop = () => {
   const { products, initProducts } = useProducts();

   useEffect(() => {
      initProducts();
   }, [initProducts]);

   return (
      <>
         <div className="p-4">
            {products.map((product, index) => (
               <ProductCard key={index} product={product} />
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
               <ProductCard key={index} />
            ))}
         </div>
      </>
   );
};
