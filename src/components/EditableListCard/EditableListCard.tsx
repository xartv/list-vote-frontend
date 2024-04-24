import { Ellipsis, Plus, UserPlus, X } from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface EditableCardProps {
  listId?: string;
}

export function EditableListCard({ listId }: EditableCardProps) {
  const isEdit = Boolean(listId);

  if (isEdit) return <div>EDIT MODE - list_id: {listId}</div>;

  return (
    <Card
      width='full'
      height='full'
      className='relative'
    >
      <div className='flex items-center justify-between px-[32px] py-[16px]'>
        <div className='flex items-center gap-[8px]'>
          <UserPlus
            width={20}
            height={20}
          />
          <span className='text-[14px] leading-[16px]'>Пригласить</span>
        </div>

        <div className='flex items-center gap-[16px]'>
          <Ellipsis />
          <X />
        </div>
      </div>

      <div className='mt-[24px] flex flex-col gap-[24px] px-[32px]'>
        <Input
          mode='clear'
          placeholder='Введите заголовок'
        />

        {/*<textarea
          placeholder='Введите текст'
          className='border-1 block min-h-[152px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green'
        />*/}
      </div>

      <Button
        size='fit'
        className='absolute bottom-[32px] left-[32px] px-[32px]'
      >
        Сохранить заметку
      </Button>

      <Button
        size='fit'
        className='rounded-circle shadow-button absolute bottom-[32px] right-[32px] h-[80px] w-[80px]'
      >
        <Plus
          width={32}
          height={32}
        />
      </Button>
    </Card>
  );
}
