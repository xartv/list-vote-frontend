import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm transition-color duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
  variants: {
    theme: {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
      secondary:
        'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-200 focus-visible:outline-indigo-100',
    },
    size: {
      full: 'w-full',
      fit: 'w-fit',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-30',
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'full',
  },
});
