'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader/Loader';
import { Title } from '@/components/ui/Title';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useLogout } from '@/hooks/useLogout';
import { useProfile } from '@/hooks/useProfile';

export function Header() {
  const router = useRouter();

  const { user, isPending } = useProfile();

  const { logout } = useLogout();

  const handleLogout = () => logout();

  return (
    <section className='col-span-2 flex w-full items-center justify-between bg-black-middle px-[32px] py-[12px] font-bold'>
      <Title
        element='h1'
        className={`font-robotoFlex cursor-pointer text-[20px] font-black leading-[24px]`}
        onClick={() => router.push(LISTS_PAGE.HOME)}
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
