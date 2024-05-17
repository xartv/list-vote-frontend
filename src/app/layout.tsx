import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';

import { SITE_NAME } from '@/constants/seo.constants';

import './globals.scss';
import { Providers } from './providers';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

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
      className='h-full'
    >
      <body
        className={clsx(
          roboto.variable,
          montserrat.variable,
          'h-full sm:overflow-auto',
        )}
      >
        <Providers>
          {children}
          <Toaster
            theme='dark'
            position='bottom-right'
            duration={1500}
          />
        </Providers>

        <div id='portal-wrapper'></div>
      </body>
    </html>
  );
}
