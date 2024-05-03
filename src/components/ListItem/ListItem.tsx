import { Pencil, SendHorizontal, Star, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IListItem } from '@/types/list-item.types';

import { useCreateListItem } from '@/hooks/useCreateListItem';
import { useDeleteListItem } from '@/hooks/useDeleteListItem';
import { useUpdateListItemDebounce } from '@/hooks/useUpdateListItemDebounce';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface ListItemProps {
  listId: string;
  listItem: Partial<IListItem>;
  index?: number;
  onDelete?: () => void;
  isEdit?: boolean;
}

export function ListItem({
  listItem,
  index,
  listId,
  isEdit,
  onDelete,
}: ListItemProps) {
  const {
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<{ title: string; creatingTitle: string }>({
    defaultValues: { title: listItem?.title },
    values: { title: listItem?.title ?? '', creatingTitle: '' },
  });
  const { createListItem } = useCreateListItem(listId);
  const { deleteListItem } = useDeleteListItem(listId);

  useUpdateListItemDebounce({ watch, listItemId: listItem?.id });

  const handleClickEdit = () => setFocus('title');
  const handleCreateListItem = () => {
    createListItem({ title: watch('creatingTitle'), listId });
    onDelete?.();
  };
  const handleDeleteListItem = () => deleteListItem(listItem?.id ?? '');

  return (
    <>
      {!isEdit && (
        <Card
          width='full'
          height='fit'
          className='flex flex-shrink-0 flex-col gap-[16px] overflow-hidden rounded-sm border-2 border-black-stroke pt-[16px]'
        >
          <div className='flex flex-col gap-[8px] px-[16px]'>
            <div className='flex flex-1 items-center justify-between gap-[32px]'>
              <Input
                mode='clear'
                className='flex-1'
                {...register('title')}
              />
              <div className='flex gap-[12px]'>
                <Pencil
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                  onClick={handleClickEdit}
                />
                <Trash2
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                  onClick={handleDeleteListItem}
                />
              </div>
            </div>

            <p className='flex items-center gap-[8px]'>
              <span className='text-[14px] leading-[16px] text-yellow'>
                {listItem.rating}
              </span>
              <span className='text-[12px] leading-[14px] text-text-grey'>
                здесь будет кол-во оценок
              </span>
            </p>
          </div>

          <div className='flex w-full justify-end bg-black p-[16px]'>
            <p className='flex items-center gap-[10px] text-[14px] leading-[14px]'>
              <span className='cursor-pointer text-green-light'>
                Изменить оценку
              </span>
              <span className='flex items-center gap-[4px] text-text-grey'>
                <Star size={16} />
                <span>Здесь будет моя оценка</span>
              </span>
            </p>
          </div>
        </Card>
      )}

      {isEdit && (
        <div>
          <textarea
            {...register('creatingTitle')}
            placeholder='Введите текст'
            className='border-1 block min-h-[132px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green'
          />

          <div className='mt-[12px] flex justify-end gap-[14px]'>
            <Button
              size='fit'
              bg='grey'
              className='h-[44px] w-[44px] rounded-xs'
              onClick={onDelete}
            >
              <X />
            </Button>

            <Button
              size='fit'
              className='h-[44px] w-[44px] rounded-xs'
              onClick={handleCreateListItem}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
