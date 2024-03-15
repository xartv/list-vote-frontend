'use client';

import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/Avatar';
import { Loader } from '@/components/Loader/Loader';
import { Title } from '@/components/Title';

import { useProfile } from '@/hooks/useProfile';

export function Header() {
  const pathname = usePathname();

  const { data, isPending } = useProfile();

  return (
    <section className='bg-gray-200 p-5 flex justify-between items-center'>
      <Title element='h2'>{pathname}</Title>
      {isPending ? (
        <Loader />
      ) : (
        <div className='flex gap-4 items-center'>
          <div>
            {data?.name} - {data?.email}
          </div>
          <Avatar userName={data?.name} />
        </div>
      )}
    </section>
  );
}
