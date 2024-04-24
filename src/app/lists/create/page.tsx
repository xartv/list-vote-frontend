import { Metadata } from 'next';

import { EditableListCard } from '@/components/EditableListCard';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Create',
  ...NO_INDEX_PAGE,
};

export default function CreatePage() {
  return <EditableListCard />;
}
