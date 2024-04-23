'use client';

import { ListCard } from '@/components/ListCard';
import { Button } from '@/components/ui/Button';

import { useLists } from '@/hooks/useLists';

export function Sidebar() {
  const { data: lists } = useLists();

  console.log(lists);

  return (
    <section className='flex h-full w-[286px] flex-col gap-[16px]'>
      <Button>Создать заметку</Button>

      {lists?.map(list => (
        <ListCard
          key={list.id}
          list={list}
        />
      ))}
    </section>
  );
}
