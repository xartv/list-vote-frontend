'use client';

import { useParams, useRouter } from 'next/navigation';

import { ListCard } from '@/components/ListCard';
import { Button } from '@/components/ui/Button';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useLists } from '@/hooks/useLists';

export function Sidebar() {
  const router = useRouter();
  const { data: lists } = useLists();
  const params = useParams();

  return (
    <section className='flex h-full w-[286px] flex-col gap-[16px]'>
      <Button
        onClick={() => router.push(LISTS_PAGE.CREATE_LIST)}
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
