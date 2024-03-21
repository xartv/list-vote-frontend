'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';

import { AUTH_ERROR_MESSAGES } from '@/constants/auth.constants';

import { IAuthForm, TAuthErrorResponse } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { authService } from '@/services/auth.service';

export function Auth() {
  const { register, handleSubmit, reset, watch } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const [isLoginForm, setIsLoginForm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const { push } = useRouter();

  const password = watch('password');
  const email = watch('email');

  const isPasswordEqualsConfirm = password && password === passwordConfirm;
  const isPasswordStrong = passwordStrength >= 3;
  const isSubmitButtonDisabled =
    !isLoginForm && (!email || !isPasswordEqualsConfirm || !isPasswordStrong);

  const mutationFn = (data: IAuthForm) =>
    authService.main(isLoginForm ? 'login' : 'register', data);

  const onSuccess = () => {
    toast.success('You have successfully logged in');
    reset();
    push(DASHBOARD_PAGES.HOME);
  };

  const onError = (error: AxiosError<TAuthErrorResponse>) => {
    const message = error.response?.data.message;

    if (message === AUTH_ERROR_MESSAGES.USER_ALREADY_EXIST) {
      toast.error(AUTH_ERROR_MESSAGES.USER_ALREADY_EXIST);
    }

    if (
      Array.isArray(message) &&
      message.includes(AUTH_ERROR_MESSAGES.PASSWORD_LENGTH)
    ) {
      toast.error(AUTH_ERROR_MESSAGES.PASSWORD_LENGTH);
    }
  };

  const onSubmit: SubmitHandler<IAuthForm> = data => {
    if (!isPasswordEqualsConfirm) {
      toast.error(AUTH_ERROR_MESSAGES.PASSWORD_NOT_CONFIRMED);
      return;
    }

    if (!isPasswordStrong) {
      toast.error(AUTH_ERROR_MESSAGES.PASSWORD_NOT_STRONG);
      return;
    }

    mutate(data);
  };

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn,
    onSuccess,
    onError,
  });

  return (
    <section className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <Title element='h1'>{isLoginForm ? 'Sign in' : 'Register'}</Title>

      <form
        className='mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm'
        action='#'
        method='POST'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          id='email'
          type='email'
          label='Email address'
          {...register('email', {
            required: 'Email is required',
          })}
        />

        <Field
          id='password'
          type='password'
          label='Password'
          {...register('password', {
            required: 'Password is required',
          })}
        />

        {!isLoginForm && (
          <Field
            id='passwordConfirm'
            type='password'
            label='Confirm password'
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        )}

        {!isLoginForm && (
          <PasswordStrengthBar
            password={password}
            minLength={6}
            onChangeScore={score => setPasswordStrength(score)}
          />
        )}

        <Text
          className='cursor-pointer underline underline-offset-2'
          onClick={() => setIsLoginForm(prev => !prev)}
        >
          {isLoginForm ? "Don't have an account?" : 'Already have an account?'}
        </Text>

        <Button
          type='submit'
          disabledUi={isSubmitButtonDisabled}
        >
          {isLoginForm ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
    </section>
  );
}
