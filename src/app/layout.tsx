import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { SITE_NAME } from '@/constants/seo.constants';

import './globals.scss';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Vote for shared leisure time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full bg-white'
    >
      <body className={clsx(inter.className, 'h-full')}>
        <Providers>
          {children}
          <Toaster
            theme='dark'
            position='bottom-right'
            duration={1500}
          />
        </Providers>
      </body>
    </html>
  );
}
