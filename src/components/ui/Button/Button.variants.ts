import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'flex justify-center text-[16px] leading-[20px] items-center rounded transition-colors duration-150 bg-green-light text-white hover:bg-green focus-visible:bg-green',
  variants: {
    size: {
      full: 'w-full',
      fit: 'w-fit',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-30',
    },
    height: {
      '44': 'h-[44px]',
      '52': 'h-[52px]',
    },
  },
  defaultVariants: {
    size: 'full',
    height: '44',
  },
});
