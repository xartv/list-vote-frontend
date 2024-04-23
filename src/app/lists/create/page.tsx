import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Create } from './Create';

export const metadata: Metadata = {
  title: 'Create',
  ...NO_INDEX_PAGE,
};

export default function CreatePage() {
  return <Create />;
}
