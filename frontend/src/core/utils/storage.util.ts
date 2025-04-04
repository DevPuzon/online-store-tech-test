'use client';

export const storageGetItem = (key: string): string | null => {
   if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
   }
   return null;
};

export const storageSetItem = (key: string, value: string): void => {
   if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
   }
};

export const storageRemoveItem = (key: string): void => {
   if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
   }
};

export const storageClear = (): void => {
   if (typeof window !== 'undefined') {
      window.localStorage.clear();
   }
};
