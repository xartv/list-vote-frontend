import { tv } from 'tailwind-variants';

export const card = tv({
  base: 'rounded-md',
  variants: {
    width: {
      full: 'w-full',
      fit: 'w-fit',
    },
    height: {
      full: 'h-full',
      fit: 'h-fit',
    },
    bg: {
      light: 'bg-black-stroke',
      primary: 'bg-black-middle',
    },
  },
  defaultVariants: {
    bg: 'primary',
    width: 'fit',
    height: 'fit',
  },
});
