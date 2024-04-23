import { Ellipsis, UserPlus, X } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function Create() {
  return (
    <Card
      width='full'
      height='full'
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
        <p className='text-[20px] leading-[26px] text-text-grey'>
          Введите заголовок
        </p>

        <textarea
          placeholder='Введите текст'
          className='border-1 block min-h-[152px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green'
        />
      </div>
    </Card>
  );
}
