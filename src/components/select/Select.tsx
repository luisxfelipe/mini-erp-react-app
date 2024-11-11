/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
// src/components/select/Select.tsx
import { forwardRef, HtmlHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface SelectProps extends HtmlHTMLAttributes<HTMLSelectElement> {
  title?: string;
  name: string;
  options: { value: any; label: string }[];
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, name, options, register, registerOptions, ...rest }) => {
    return (
      <div>
        {title && <p className='mb-2 font-medium'>{title}</p>}
        <select {...rest} {...register(name, registerOptions)}>
          {options.length === 0 && <option value=''>Carregando...</option>}
          <option value=''></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
