'use client';

import { Plus, Trash2, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useCreateList } from '@/hooks/useCreateList';
import { useDeleteList } from '@/hooks/useDeleteList';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface EditableCardProps {
  listId?: string;
}

export function EditableListCard({ listId }: EditableCardProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ title: string }>();
  const { createList, createdList, isSuccessListCreating } = useCreateList();
  const { deleteList } = useDeleteList();

  const isEdit = Boolean(listId);
  const title = watch('title');

  const handleExit = () => router.push(LISTS_PAGE.HOME);

  const handleDeleteList = () => {
    deleteList(listId ?? '');
    router.push(LISTS_PAGE.HOME);
  };

  const onSubmit: SubmitHandler<{ title: string }> = async data => {
    createList(data.title);
  };

  useEffect(() => {
    if (isSuccessListCreating)
      router.push(`${LISTS_PAGE.EDIT_LIST}/${createdList?.id}`);
  }, [isSuccessListCreating, createdList?.id, router]);

  return (
    <Card
      width='full'
      height='full'
      className='relative'
    >
      <div
        className={`flex items-center ${isEdit ? 'justify-between' : 'justify-end'} px-[32px] py-[16px]`}
      >
        {isEdit && (
          <div className='flex items-center gap-[8px]'>
            <UserPlus
              width={20}
              height={20}
            />
            <span className='text-[14px] leading-[16px]'>Пригласить</span>
          </div>
        )}

        <div className='flex items-center gap-[16px]'>
          {isEdit && (
            <Trash2
              className='cursor-pointer'
              onClick={handleDeleteList}
            />
          )}

          <X
            className='cursor-pointer'
            onClick={handleExit}
          />
        </div>
      </div>

      <form
        className='mt-[24px] flex flex-col gap-[24px] px-[32px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          mode='clear'
          placeholder='Введите заголовок'
          classNames={{
            input: `${errors.title && 'placeholder:text-green'}`,
          }}
          {...register('title', { required: true })}
        />

        {/*<textarea
          placeholder='Введите текст'
          className='border-1 block min-h-[152px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 ring-green placeholder:text-[16px] placeholder:text-text-grey focus:border-green  focus:ring-green'
        />*/}

        <Button
          size='fit'
          className='absolute bottom-[32px] left-[32px] px-[32px]'
          disabledUi={!title}
        >
          Сохранить заметку
        </Button>
      </form>

      <Button
        size='fit'
        className='absolute bottom-[32px] right-[32px] h-[80px] w-[80px] rounded-circle shadow-button'
      >
        <Plus
          width={32}
          height={32}
        />
      </Button>
    </Card>
  );
}
