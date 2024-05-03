import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import type { ReactNode } from 'react';

import { input } from './Input.variants';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: any;
  className?: string;
  classNames?: {
    label?: string;
    input?: string;
  };
  postfix?: ReactNode;
  mode?: 'border' | 'clear';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      autoComplete,
      required,
      className,
      classNames = {},
      label,
      error,
      postfix,
      mode,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`flex flex-col gap-[4px] ${className}`}>
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
            className={input({
              mode,
              className: `${classNames.input}`,
            })}
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
