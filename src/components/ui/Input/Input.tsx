import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
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
      <div className='flex flex-col gap-2'>
        {Boolean(label) && (
          <label
            htmlFor={id}
            className={clsx('text-white block text-[14px]', classNames.label)}
          >
            {label}
          </label>
        )}

        <div className='relative'>
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            className={clsx(
              classNames.input,
              'border-1 block w-full rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green',
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
          <span className='text-[12px] leading-[14px] text-red'>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
