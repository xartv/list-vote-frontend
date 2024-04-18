import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
  classNames?: {
    label?: string;
    input?: string;
  };
  postfix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      autoComplete,
      required,
      classNames = {},
      label,
      error,
      postfix,
      ...rest
    },
    ref,
  ) => {
    return (
      <div>
        <label
          htmlFor={id}
          className={clsx('block text-[14px] text-white', classNames.label)}
        >
          {label}
        </label>

        <div className='relative'>
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            className={clsx(
              'rounded-xs border-1 bg-black-middle border-grey-stroke ring-green focus:ring-green focus:border-green placeholder:text-gray mt-2 block w-full  py-1.5',
              classNames.input,
            )}
            {...rest}
          />

          {postfix && (
            <div className='absolute right-2 top-1/2 -translate-y-1/2 transform'>
              {postfix}
            </div>
          )}
        </div>

        {error?.message && (
          <span className='text-red text-[12px] leading-[14px]'>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
