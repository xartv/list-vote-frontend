'use client';

import { LogOut } from 'lucide-react';
import { Roboto_Flex } from 'next/font/google';

import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader/Loader';
import { Title } from '@/components/ui/Title';

import { useLogout } from '@/hooks/useLogout';
import { useProfile } from '@/hooks/useProfile';

const robotoFlex = Roboto_Flex({ subsets: ['latin'] });

export function Header() {
  const { user, isPending } = useProfile();

  const { logout } = useLogout();

  const handleLogout = () => logout();
  return (
    <section className='col-span-2 flex w-full items-center justify-between bg-black-middle px-[32px] py-[12px]'>
      <Title
        element='h1'
        className={`text-[20px] font-black leading-[24px] ${robotoFlex.className}`}
      >
        List vote
      </Title>
      {isPending ? (
        <Loader />
      ) : (
        <div className='flex items-center gap-[16px]'>
          <Avatar userName={user?.name} />
          <LogOut
            className='cursor-pointer'
            onClick={handleLogout}
          />
        </div>
      )}
    </section>
  );
}
