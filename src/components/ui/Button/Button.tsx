import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { button } from './Button.variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'full' | 'fit';
  bg?: 'green' | 'grey';
  disabledUi?: boolean;
}

export function Button({
  type,
  children,
  className,
  size,
  disabledUi,
  bg,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={button({
        size: size,
        disabled: disabledUi,
        bg,
        className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
