'use client';

import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader/Loader';
import { Title } from '@/components/ui/Title';

import { useProfile } from '@/hooks/useProfile';

export function Header() {
  const pathname = usePathname();

  const { data, isPending } = useProfile();

  return (
    <section className='flex items-center justify-between bg-gray-200 p-5'>
      <Title element='h2'>{pathname}</Title>
      {isPending ? (
        <Loader />
      ) : (
        <div className='flex items-center gap-4'>
          <div>
            {data?.name} - {data?.email}
          </div>
          <Avatar userName={data?.name} />
        </div>
      )}
    </section>
  );
}
