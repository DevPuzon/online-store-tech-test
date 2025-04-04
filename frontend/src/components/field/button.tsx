import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   theme: 'primary' | 'success' | 'danger';
}

export const Button = ({ children, theme, ...props }: ButtonProps) => {
   const themeStyles = {
      primary: 'bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] focus:ring-[#4F46E5]',
      success: 'bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] focus:ring-[#16A34A]',
      danger: 'bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] focus:ring-[#DC2626]',
   };

   return (
      <button
         {...props}
         className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200 ${
            themeStyles[theme]
         } ${props.className || ''}`}
      >
         {children}
      </button>
   );
};
