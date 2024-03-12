import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  element: 'h1' | 'h2' | 'h3';
}

export function Title({
  element,
  children,
  className,
  ...rest
}: PropsWithChildren<TitleProps>) {
  const Element = element;

  return (
    <Element
      className={clsx(
        'text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:mx-auto sm:w-full sm:max-w-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
}
