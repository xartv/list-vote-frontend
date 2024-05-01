import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'flex justify-center text-[16px] leading-[20px] items-center rounded transition-colors duration-150 text-white',
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
    bg: {
      green: 'bg-green-light hover:bg-green focus-visible:bg-green',
      grey: 'bg-black-light hover:bg-black-stroke focus-visible:black-stroke',
    },
  },
  defaultVariants: {
    size: 'full',
    height: '44',
    bg: 'green',
  },
});
