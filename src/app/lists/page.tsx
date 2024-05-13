import { Metadata } from 'next';
import Image from 'next/image';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import catSvg from '@/assets/cat.svg';

export const metadata: Metadata = {
  title: 'Lists',
  ...NO_INDEX_PAGE,
};

export default function ListsPage() {
  return (
    <Image
      src={catSvg}
      alt='cat placeholder'
      width={184}
      height={184}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden'
    />
  );
}
