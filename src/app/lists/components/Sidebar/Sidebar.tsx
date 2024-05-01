'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ListCard } from '@/components/ListCard';
import { Button } from '@/components/ui/Button';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useCreateList } from '@/hooks/useCreateList';
import { useLists } from '@/hooks/useLists';

export function Sidebar() {
  const router = useRouter();
  const { data: lists } = useLists();
  const params = useParams();

  const { createList, createdList, isSuccessListCreating } = useCreateList();

  const handleCreateList = () => createList('');

  useEffect(() => {
    if (isSuccessListCreating)
      router.push(`${LISTS_PAGE.EDIT_LIST}/${createdList?.id}`);
  }, [isSuccessListCreating, createdList?.id, router]);

  return (
    <section className='flex h-full w-[286px] flex-shrink-0 flex-col gap-[16px]'>
      <Button
        onClick={handleCreateList}
        className='flex-shrink-0'
      >
        Создать заметку
      </Button>

      <div className='flex h-[calc(100vh-182px)] flex-col gap-[16px] overflow-auto'>
        {lists?.map(list => {
          const isActive = list.id === params.id;

          return (
            <ListCard
              key={list.id}
              list={list}
              isActive={isActive}
            />
          );
        })}
      </div>
    </section>
  );
}
