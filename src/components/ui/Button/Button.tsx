import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { button } from './Button.variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'full' | 'fit';
  theme?: 'primary' | 'secondary';
  disabledUi?: boolean;
}

export function Button({
  children,
  type,
  className,
  size,
  theme,
  disabledUi,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={button({
        size: size,
        theme: theme,
        disabled: disabledUi,
        className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
