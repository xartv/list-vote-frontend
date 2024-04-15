'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

import { useCreateList } from '@/hooks/useCreateList';
import { useCreateListItem } from '@/hooks/useCreateListItem';
import { useDeleteList } from '@/hooks/useDeleteList';
import { useLists } from '@/hooks/useLists';

import { CreateListItem } from './CreateListItem/CreateListItem';

export function Dashboard() {
  const [createdListTitle, setCreatedListTitle] = useState<string>('');

  const { data: lists } = useLists();
  const { deleteList } = useDeleteList();
  const { createList } = useCreateList();

  if (!lists?.length) return <div>No lists</div>;

  return (
    <ul className='flex w-full flex-wrap gap-8 p-4'>
      {lists.map(list => (
        <li
          key={list.id}
          className='flex h-[500px] w-[300px] flex-col gap-2 rounded-lg bg-white p-4'
        >
          <div className='mx-auto'>{list.title}</div>

          {Boolean(list.items.length) && (
            <ul className='mt-4 list-inside list-disc'>
              {list.items.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          )}

          <CreateListItem listId={list.id} />

          <Button onClick={() => deleteList(list.id)}>Delete list</Button>
        </li>
      ))}

      {/**
       * useForm
       */}
      <div
        key='create'
        className='flex h-[500px] w-[300px] flex-col gap-2 rounded-lg bg-white p-4'
      >
        <input
          type='text'
          value={createdListTitle}
          onChange={event => setCreatedListTitle(event.target.value)}
        />

        <Button onClick={() => createList(createdListTitle)}>
          Create list
        </Button>
      </div>
    </ul>
  );
}
