import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Text({
  children,
  className,
  ...rest
}: PropsWithChildren<TextProps>) {
  return (
    <p
      className={clsx('text-center text-sm text-gray-500', className)}
      {...rest}
    >
      {children}
    </p>
  );
}
