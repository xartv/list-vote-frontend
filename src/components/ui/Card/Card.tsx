import type React from 'react';

import { card } from './Card.variants';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: 'fit' | 'full';
  width?: 'fit' | 'full';
  bg?: 'light' | 'primary';
  isActive?: boolean;
  className?: string;
}

export function Card({
  children,
  height,
  width,
  bg,
  isActive,
  className,
  ...restProps
}: CardProps) {
  return (
    <div
      {...restProps}
      className={card({
        bg,
        height,
        width,
        isActive,
        className,
      })}
    >
      {children}
    </div>
  );
}
