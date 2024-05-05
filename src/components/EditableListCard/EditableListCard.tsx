'use client';

import { Plus, Trash2, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { ERating, TListItemRequest } from '@/types/list-item.types';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useDeleteList } from '@/hooks/useDeleteList';
import { useListById } from '@/hooks/useListById';
import { useUpdateListDebounce } from '@/hooks/useUpdateListDebounce';

import { AssignListModal } from '../AssignListModal';
import { ListItem } from '../ListItem';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface EditableCardProps {
  listId: string;
}

export function EditableListCard({ listId }: EditableCardProps) {
  const router = useRouter();
  const [createdListItems, setCreatedListItems] = useState<TListItemRequest[]>(
    [],
  );
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  // TODO: use cachedData from lists query with queryClient, only if no cache - useListById
  const { list } = useListById(listId);
  const { register, watch } = useForm<{ title: string }>({
    defaultValues: { title: list?.title },
    values: { title: list?.title ?? '' },
  });
  const { deleteList } = useDeleteList();

  const [listItemKeys, setListItemKeys] = useState<string[]>([]);

  useUpdateListDebounce({ watch, listId });

  const handleExit = () => router.push(LISTS_PAGE.HOME);

  const handleDeleteList = () => {
    deleteList(listId);
    router.push(LISTS_PAGE.HOME);
  };

  const handleAddListItem = () => {
    setCreatedListItems(prev => [...prev, { title: '', rating: ERating.NULL }]);
    setListItemKeys(prevKeys => [...prevKeys, uuid()]);
  };
  const handleRemoveListItem = (index: number) => {
    setCreatedListItems(prevListItems =>
      prevListItems.filter((_, i) => i !== index),
    );
    setListItemKeys(prevKeys => prevKeys.filter((_, i) => i !== index));
  };
  const handleAssignModalOpen = () => setIsAssignModalOpen(true);
  const handleAssignModalClose = () => setIsAssignModalOpen(false);

  return (
    <Card
      width='full'
      height='full'
      className='relative'
    >
      <div className={`flex items-center justify-between px-[32px] py-[16px]`}>
        <div
          className='flex cursor-pointer items-center gap-[8px]'
          onClick={handleAssignModalOpen}
        >
          <UserPlus
            width={20}
            height={20}
          />
          <span className='text-[14px] leading-[16px]'>Пригласить</span>
        </div>

        <div className='flex items-center gap-[16px]'>
          <Trash2
            className='cursor-pointer'
            onClick={handleDeleteList}
          />

          <X
            className='cursor-pointer'
            onClick={handleExit}
          />
        </div>
      </div>

      <form className='mt-[24px] px-[32px]'>
        <Input
          mode='clear'
          type='email'
          placeholder='Введите заголовок'
          classNames={{
            input: 'p-0',
          }}
          {...register('title')}
        />
      </form>

      <div className='scro mt-[24px] flex h-[600px] flex-col gap-[20px] overflow-auto px-[32px]'>
        {list?.items.map(listItem => (
          <ListItem
            listId={listId}
            key={listItem.id}
            listItem={listItem}
          />
        ))}

        {createdListItems.map((listItem, index) => (
          <ListItem
            key={listItemKeys[index]}
            listId={listId}
            listItem={listItem}
            isEdit
            onDelete={() => handleRemoveListItem(index)}
          />
        ))}
      </div>

      <Button
        size='fit'
        className='absolute bottom-[32px] right-[32px] h-[80px] w-[80px] cursor-pointer rounded-circle shadow-button transition-all duration-300 hover:scale-110'
        onClick={handleAddListItem}
      >
        <Plus
          width={32}
          height={32}
        />
      </Button>

      <AssignListModal
        title='Совместный доступ к заметке'
        isOpen={isAssignModalOpen}
        listId={listId}
        handleClose={handleAssignModalClose}
      />
    </Card>
  );
}
