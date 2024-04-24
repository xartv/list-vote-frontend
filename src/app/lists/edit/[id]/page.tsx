import { Metadata } from 'next';

import { EditableListCard } from '@/components/EditableListCard';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Edit',
  ...NO_INDEX_PAGE,
};

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditableListCard listId={params.id} />;
}
