import { tv } from 'tailwind-variants';

export const input = tv({
  base: 'block w-full placeholder:text-text-grey bg-black-middle',
  variants: {
    mode: {
      border:
        'border-1 rounded-xs border-grey-stroke ring-green placeholder:text-[16px] focus:border-green focus:ring-green py-1.5',
      clear:
        'border-none text-[20px] focus:border-none focus:ring-0 focus:shadow-none placeholder:text-[20px]',
    },
  },
  defaultVariants: {
    mode: 'border',
  },
});
