import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'green-light': '#17C047',
      green: '#0EA338',
      'black-light': '#2D2F31',
      black: '#171717',
      'black-middle': '#1E1E1E',
      'black-stroke': '#272727',
      'grey-stroke': '#545556',
      pink: '#B867F8',
      blue: '#4A5BE6',
      red: '#EC3434',
      'text-white': '#FFFFFF',
      'text-grey': '#6C6C6C',
    },
    borderRadius: {
      DEFAULT: '100px',
      xs: '8px',
      sm: '16px',
      md: '20px',
      circle: '50%',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        button: '0px 0px 300px 88px rgba(0,255,17,0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
