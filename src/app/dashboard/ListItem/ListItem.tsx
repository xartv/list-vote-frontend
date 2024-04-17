'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';

import { IListItem } from '@/types/list-item.types';

import { useDeleteListItem } from '@/hooks/useDeleteListItem';
import { useUpdateListItem } from '@/hooks/useUpdateListItem';

interface ListItemProps {
  listItem: IListItem;
}

export function ListItem({ listItem }: ListItemProps) {
  const { id, title, rating } = listItem;

  const [editedTitle, setEditedTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { deleteListItem } = useDeleteListItem();
  const { updateListItem } = useUpdateListItem(() => setIsEdit(false));

  const handleEdit = () => {
    setIsEdit(prev => !prev);

    if (!isEdit) {
      setEditedTitle(title);
    } else {
      setEditedTitle('');
    }
  };

  return (
    <li className='flex flex-wrap items-center gap-4'>
      {isEdit ? (
        <input
          value={editedTitle}
          onChange={event => setEditedTitle(event.target.value)}
        />
      ) : (
        <Text>{title}</Text>
      )}

      <Button
        size='fit'
        className='text-xs'
        onClick={handleEdit}
      >
        Toggle edit
      </Button>

      {isEdit && (
        <Button
          size='fit'
          onClick={() =>
            updateListItem({ listItemId: id, newData: { title: editedTitle } })
          }
        >
          Update
        </Button>
      )}

      <Button
        size='fit'
        className='text-xs'
        onClick={() => deleteListItem(id)}
      >
        X
      </Button>
    </li>
  );
}
