'use client';

import { log } from 'console';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { useListById } from '@/hooks/useListById';
import { useUpdateList } from '@/hooks/useUpdateList';

export function Edit() {
  const params = useParams<{ id: string }>();

  const { data } = useListById(params.id);
  const { updateList, setTitle, title } = useUpdateList();

  useEffect(() => {
    setTitle(data?.title);
  }, [data?.title, setTitle]);

  return (
    <>
      <input
        type='text'
        value={title ?? ''}
        onChange={event => setTitle(event.target.value)}
      />

      <Button onClick={() => updateList(params.id)}>Save</Button>
    </>
  );
}
