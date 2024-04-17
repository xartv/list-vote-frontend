'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/Button';

import { useCreateList } from '@/hooks/useCreateList';
import { useDeleteList } from '@/hooks/useDeleteList';
import { useLists } from '@/hooks/useLists';

import { CreateListItem } from './CreateListItem/CreateListItem';
import { ListAssignment } from './ListAssignment';
import { ListItem } from './ListItem';

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
            <ul className='mt-4 flex list-inside list-disc flex-col gap-2'>
              {list.items.map(item => (
                <ListItem
                  key={item.id}
                  listItem={item}
                />
              ))}
            </ul>
          )}

          <CreateListItem listId={list.id} />

          <Link href={`/dashboard/edit/${list.id}`}>Edit list</Link>

          <Button onClick={() => deleteList(list.id)}>Delete list</Button>

          <ListAssignment listId={list.id} />
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
