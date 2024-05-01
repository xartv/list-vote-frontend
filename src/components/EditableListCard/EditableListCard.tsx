'use client';

import { Plus, Trash2, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { ERating, IListItem, TListItemRequest } from '@/types/list-item.types';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useCreateList } from '@/hooks/useCreateList';
import { useDeleteList } from '@/hooks/useDeleteList';
import { useProfile } from '@/hooks/useProfile';

import { ListItem } from '../ListItem';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface EditableCardProps {
  listId?: string;
}

export function EditableListCard({ listId }: EditableCardProps) {
  const router = useRouter();
  const [createdListItems, setCreatedListItems] = useState<TListItemRequest[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ title: string }>();
  const { createList, createdList, isSuccessListCreating } = useCreateList();
  const { deleteList } = useDeleteList();
  const { user } = useProfile();

  const isEdit = Boolean(listId);
  const title = watch('title');

  const handleExit = () => router.push(LISTS_PAGE.HOME);

  const handleDeleteList = () => {
    deleteList(listId ?? '');
    router.push(LISTS_PAGE.HOME);
  };

  const handleAddListItem = () =>
    setCreatedListItems(prev => [...prev, { title: '', rating: ERating.NULL }]);
  const handleRemoveListItem = (index: number) =>
    setCreatedListItems(prev => prev.filter((_, i) => i !== index));

  const onSubmit: SubmitHandler<{ title: string }> = async data => {
    createList(data.title);
  };

  useEffect(() => {
    if (isSuccessListCreating)
      router.push(`${LISTS_PAGE.EDIT_LIST}/${createdList?.id}`);
  }, [isSuccessListCreating, createdList?.id, router]);

  return (
    <Card
      width='full'
      height='full'
      className='relative'
    >
      <div
        className={`flex items-center ${isEdit ? 'justify-between' : 'justify-end'} px-[32px] py-[16px]`}
      >
        {isEdit && (
          <div className='flex items-center gap-[8px]'>
            <UserPlus
              width={20}
              height={20}
            />
            <span className='text-[14px] leading-[16px]'>Пригласить</span>
          </div>
        )}

        <div className='flex items-center gap-[16px]'>
          {isEdit && (
            <Trash2
              className='cursor-pointer'
              onClick={handleDeleteList}
            />
          )}

          <X
            className='cursor-pointer'
            onClick={handleExit}
          />
        </div>
      </div>

      <form
        className='mt-[24px] px-[32px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          mode='clear'
          placeholder='Введите заголовок'
          classNames={{
            input: `p-0 ${errors.title && 'placeholder:text-green'}`,
          }}
          {...register('title', { required: true })}
        />

        <Button
          type='submit'
          size='fit'
          className='absolute bottom-[32px] left-[32px] px-[32px]'
          disabledUi={!title}
        >
          Сохранить заметку
        </Button>
      </form>

      <div className='scro mt-[24px] flex h-[600px] flex-col gap-[20px] overflow-auto px-[32px]'>
        {createdListItems.map((listItem, index) => (
          <ListItem
            key={uuid()}
            listItem={listItem}
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
    </Card>
  );
}
