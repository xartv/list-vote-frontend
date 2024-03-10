'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { IAuthForm } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { authService } from '@/services/auth.service';

export function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess() {
      toast.success('You have successfully logged in');
      reset();
      push(DASHBOARD_PAGES.HOME);
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data);

  return (
    <div className='flex min-h-screen'>
      <form
        className='w-1/4 m-auto shadow rounded-xl'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/**
         * HEADING
         */}
        {/**
         * FIELDS
         */}
        <div className='flex items-center gap-5 justify-center'>
          {/**
           * BUTTONS
           */}
        </div>
      </form>
    </div>
  );
}
