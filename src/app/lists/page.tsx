import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Lists',
  ...NO_INDEX_PAGE,
};

export default function ListsPage() {
  return;
}
