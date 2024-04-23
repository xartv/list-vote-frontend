'use client';

import { useRouter } from 'next/navigation';

import { ListCard } from '@/components/ListCard';
import { Button } from '@/components/ui/Button';

import { useLists } from '@/hooks/useLists';

export function Sidebar() {
  const router = useRouter();
  const { data: lists } = useLists();

  return (
    <section className='flex h-full w-[286px] flex-col gap-[16px]'>
      <Button onClick={() => router.push('/lists/create')}>
        Создать заметку
      </Button>

      {lists?.map(list => (
        <ListCard
          key={list.id}
          list={list}
        />
      ))}
    </section>
  );
}
