'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { Title } from '@/components/ui/Title';

import { AUTH_ERROR_MESSAGES } from '@/constants/auth.constants';

import { IAuthForm, TAuthErrorResponse } from '@/types/auth.types';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { authService } from '@/services/auth.service';

export function Auth() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordType, setPasswordType] = useState<'text' | 'password'>(
    'password',
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    'text' | 'password'
  >('password');

  const { push } = useRouter();

  const password = watch('password');
  const email = watch('email');

  const isPasswordEqualsConfirm = password && password === passwordConfirm;
  const isPasswordStrong = passwordStrength >= 2;
  const isSubmitButtonDisabled =
    !isLoginForm && (!email || !isPasswordEqualsConfirm || !isPasswordStrong);

  const mutationFn = (data: IAuthForm) =>
    authService.main(isLoginForm ? 'login' : 'register', data);

  const onSuccess = () => {
    toast.success('You have successfully logged in');
    reset();
    push(LISTS_PAGE.HOME);
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
    if (!isLoginForm && !isPasswordEqualsConfirm) {
      toast.error(AUTH_ERROR_MESSAGES.PASSWORD_NOT_CONFIRMED);
      return;
    }

    if (!isLoginForm && !isPasswordStrong) {
      toast.error(AUTH_ERROR_MESSAGES.PASSWORD_NOT_STRONG);
      return;
    }

    mutate(data);
  };

  const resetForm = () => {
    reset();
    setPasswordConfirm('');
    setPasswordStrength(0);
    setPasswordType('password');
    setConfirmPasswordType('password');
  };

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn,
    onSuccess,
    onError,
  });

  const passwordsPostfix = (
    field: 'password' | 'text',
    setter: Dispatch<SetStateAction<'password' | 'text'>>,
  ) => {
    const handleClick = () => {
      setter(prev => (prev === 'password' ? 'text' : 'password'));
    };

    return field === 'password' ? (
      <EyeOff
        size={18}
        strokeWidth={2}
        onClick={handleClick}
        className='cursor-pointer'
      />
    ) : (
      <Eye
        size={18}
        strokeWidth={2}
        onClick={handleClick}
        className='cursor-pointer'
      />
    );
  };

  return (
    <section className='flex min-h-full  items-center justify-center'>
      <Card className='flex min-h-[400px] w-[500px] flex-col items-center justify-center p-12'>
        <Title
          element='h1'
          className='font-montserrat'
        >
          {isLoginForm ? 'Войти' : 'Регистрация'}
        </Title>

        <form
          className='mt-10 w-full space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id='email'
            type='email'
            label='Email'
            {...register('email', {
              required: 'Email is required',
            })}
            error={errors.email}
          />

          <Input
            id='password'
            type={passwordType}
            label='Пароль'
            {...register('password', {
              required: 'Пароль обязателен',
            })}
            error={errors.password}
            postfix={passwordsPostfix(passwordType, setPasswordType)}
          />

          {!isLoginForm && (
            <Input
              id='passwordConfirm'
              type={confirmPasswordType}
              label='Подтвердите пароль'
              onChange={e => setPasswordConfirm(e.target.value)}
              postfix={passwordsPostfix(
                confirmPasswordType,
                setConfirmPasswordType,
              )}
            />
          )}

          {!isLoginForm && (
            <PasswordStrengthBar
              password={password}
              minLength={6}
              onChangeScore={score => setPasswordStrength(score)}
              scoreWords={[
                'Слишком простой пароль',
                'Слишком простой пароль',
                'Средний',
                'Хороший',
                'Сложный',
              ]}
              shortScoreWord={'Слишком простой пароль'}
            />
          )}

          <Text
            className='cursor-pointer font-thin underline underline-offset-4'
            onClick={() => {
              resetForm();
              setIsLoginForm(prev => !prev);
            }}
          >
            {isLoginForm ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}
          </Text>

          <Button
            type='submit'
            disabledUi={isSubmitButtonDisabled}
            className='font-montserrat'
          >
            {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Card>
    </section>
  );
}
