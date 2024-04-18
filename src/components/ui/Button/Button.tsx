import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { button } from './Button.variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'full' | 'fit';
  disabledUi?: boolean;
}

export function Button({
  type,
  children,
  className,
  size,
  disabledUi,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={button({
        size: size,
        disabled: disabledUi,
        className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
