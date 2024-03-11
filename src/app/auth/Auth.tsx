'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Title } from '@/components/Title';

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
    <section className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <Title
        element='h1'
        title='Sign in to your account'
      />

      <form
        className='space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
        action='#'
        method='POST'
      >
        <Field
          id='email'
          name='email'
          type='email'
          label='Email address'
        />

        <Field
          id='password'
          name='password'
          type='password'
          label='Password'
        />

        <Button type='submit'>Sign in</Button>
      </form>
    </section>
  );
}
