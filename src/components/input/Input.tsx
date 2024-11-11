/* eslint-disable react/prop-types */
import { forwardRef, HtmlHTMLAttributes } from 'react';

type InputProps = HtmlHTMLAttributes<HTMLInputElement> & {
  title?: string;
  type: string;
  placeholder?: string;
  error?: string;
  step?: string | number;
  disabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, type, placeholder, error, step, disabled, ...props }, ref) => {
    return (
      <>
        {title && <p className='mb-2 font-medium'>{title}</p>}
        <input
          className='w-full h-10 p-2 border border-gray-300 rounded-lg'
          type={type}
          step={step}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
        {error && <p className='my-1 text-red-500'>{error}</p>}
      </>
    );
  },
);

Input.displayName = 'Input';
