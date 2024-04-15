'use client';

import { Button } from '@/components/Button';

import { useCreateListItem } from '@/hooks/useCreateListItem';

interface CreateListItemProps {
  listId: string;
}

export function CreateListItem({ listId }: CreateListItemProps) {
  const { createListItem, createdItemTitle, setCreatedItemTitle } =
    useCreateListItem();

  return (
    <div>
      <input
        type='text'
        value={createdItemTitle}
        onChange={event => setCreatedItemTitle(event.target.value)}
      />

      <Button
        onClick={() => createListItem({ listId, title: createdItemTitle })}
      >
        Create list item
      </Button>
    </div>
  );
}
