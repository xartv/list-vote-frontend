import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Circle } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';

import { IList } from '@/types/list.types';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';

interface ListCardProps {
  list: IList;
  isActive?: boolean;
}

export function ListCard({ list, isActive }: ListCardProps) {
  const router = useRouter();

  const createdAt = format(list.createdAt, 'd MMMM, yyyy', { locale: ru });

  return (
    <Card
      width='full'
      isActive={isActive}
      className={`flex cursor-pointer flex-col gap-[32px] border p-[16px] transition-colors duration-150 hover:bg-black-stroke`}
      onClick={() => router.push(`${LISTS_PAGE.EDIT_LIST}/${list.id}`)}
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
              className='border-white border-[1px] [&:not(:first-child)]:ml-[-8px]'
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
