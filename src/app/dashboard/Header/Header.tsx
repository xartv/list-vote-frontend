'use client';

import { Roboto_Flex } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader/Loader';
import { Title } from '@/components/ui/Title';

import { useProfile } from '@/hooks/useProfile';

const robotoFlex = Roboto_Flex({ subsets: ['latin'] });

export function Header() {
  const pathname = usePathname();

  const { data, isPending } = useProfile();

  return (
    <section className='col-span-2 flex w-full items-center justify-between bg-black-middle px-[32px] py-[12px]'>
      <Title
        element='h1'
        className={`text-[20px] font-black leading-[24px] ${robotoFlex.className}`}
      >
        List vote
      </Title>
      {isPending ? <Loader /> : <Avatar userName={data?.name} />}
    </section>
  );
}
