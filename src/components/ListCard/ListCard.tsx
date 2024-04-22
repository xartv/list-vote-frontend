import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Circle } from 'lucide-react';

import { IList } from '@/types/list.types';

import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';

interface ListCardProps {
  list: IList;
}

export function ListCard({ list }: ListCardProps) {
  const createdAt = format(list.createdAt, 'd MMMM, yyyy', { locale: ru });

  return (
    <Card
      width='full'
      className='border-1 flex flex-col gap-[32px] border border-green-light p-[16px]'
    >
      <div className='flex flex-col gap-[8px]'>
        <span className='text-[11px] leading-[13px] text-text-grey'>
          {createdAt}
        </span>

        <h2 className='text-[17px] font-bold leading-[21px]'>{list.title}</h2>
      </div>

      <div className='flex h-[32px] items-end justify-between'>
        <div className='flex h-[24px] items-center'>
          <div className='flex h-[24px] w-[24px] items-center justify-center'>
            <Circle
              absoluteStrokeWidth
              height={9}
              width={9}
              strokeWidth={5}
              className='text-green-light'
            />
          </div>
          <span className='text-[12px] leading-[14px] text-text-grey'>
            {list.items.length} идей
          </span>
        </div>

        <div className='flex'>
          {list.accessUsers.map(accessUser => (
            <Avatar
              key={accessUser.user.id}
              userName={accessUser.user.name}
              className='border-[1px] border-white [&:not(:first-child)]:ml-[-8px]'
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
