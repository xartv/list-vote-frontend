import { SendHorizontal, X } from 'lucide-react';

import { IListItem } from '@/types/list-item.types';

import { Button } from '../ui/Button';

interface ListItemProps {
  listItem: Partial<IListItem>;
  index?: number;
  onDelete?: () => void;
}

export function ListItem({ listItem, index, onDelete }: ListItemProps) {
  return (
    <div>
      <textarea
        placeholder='Введите текст'
        className='border-1 block min-h-[152px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green'
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
  );
}
