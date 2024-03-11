import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Text({ children, className }: PropsWithChildren<TextProps>) {
  return (
    <p className={clsx('mt-10 text-center text-sm text-gray-500', className)}>
      {children}
    </p>
  );
}
