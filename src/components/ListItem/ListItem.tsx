import { Pencil, SendHorizontal, Star, Trash2, X } from 'lucide-react';
import { useState } from 'react';

import { IListItem } from '@/types/list-item.types';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ListItemProps {
  listItem: Partial<IListItem>;
  index?: number;
  onDelete?: () => void;
  isEdit?: boolean;
}

export function ListItem({ listItem, index, isEdit, onDelete }: ListItemProps) {
  return (
    <>
      {!isEdit && (
        <Card
          width='full'
          height='fit'
          className='flex flex-shrink-0 flex-col gap-[16px] overflow-hidden rounded-sm border-2 border-black-stroke pt-[16px]'
        >
          <div className='flex flex-col gap-[8px] px-[16px]'>
            <div className='flex flex-1 items-center justify-between'>
              <p>{listItem.title}</p>
              <div className='flex gap-[12px]'>
                <Pencil
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                />
                <Trash2
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                />
              </div>
            </div>

            <p className='flex items-center gap-[8px]'>
              <span className='text-yellow text-[14px] leading-[16px]'>
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
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
