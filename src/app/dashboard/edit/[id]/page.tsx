import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Edit } from './Edit';

export const metadata: Metadata = {
  title: 'Edit',
  ...NO_INDEX_PAGE,
};

export default function EditPage() {
  return <Edit />;
}
