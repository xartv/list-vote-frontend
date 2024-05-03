import { SubmitHandler, useForm } from 'react-hook-form';

import { useAssignList } from '@/hooks/useAssignList';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal, ModalProps } from '../ui/Modal';

interface AssignListModalProps extends ModalProps {
  listId: string;
}

export function AssignListModal({
  listId,
  ...restProps
}: AssignListModalProps) {
  const { register, watch, handleSubmit } = useForm<{ email: string }>();

  const { assignList } = useAssignList();

  const onSubmit: SubmitHandler<{ email: string }> = data => {
    assignList({ userEmail: data.email, listId });
    restProps.handleClose();
  };

  return (
    <Modal
      {...restProps}
      classNames={{ content: 'w-[376px]' }}
    >
      <form
        className='mt-[24px] flex flex-col gap-[24px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id='userEmail'
          label='Email пользователя'
          placeholder='Введите email'
          classNames={{
            input: 'h-[42px]',
            label: 'text-[14px] leading-[16px]',
          }}
          {...register('email')}
        />
        <Button
          disabled={!watch('email')}
          disabledUi={!watch('email')}
        >
          Отправить
        </Button>
      </form>
    </Modal>
  );
}
