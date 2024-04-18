import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
  classNames?: {
    label?: string;
    input?: string;
  };
  postfix?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
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
          className={clsx(
            'block text-sm font-medium leading-6 text-gray-900',
            classNames.label,
          )}
        >
          {label}
        </label>

        <div className='relative'>
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            required={required}
            className={clsx(
              'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
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
          <span className='text-xs text-red-500'>{error.message}</span>
        )}
      </div>
    );
  },
);

Field.displayName = 'Field';
