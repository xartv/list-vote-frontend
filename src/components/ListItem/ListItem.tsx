import { Pencil, SendHorizontal, Star, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IListItem } from '@/types/list-item.types';

import { useCreateListItem } from '@/hooks/useCreateListItem';
import { useCreateRatingMark } from '@/hooks/useCreateRatingMark';
import { useDeleteListItem } from '@/hooks/useDeleteListItem';
import { useProfile } from '@/hooks/useProfile';
import { useUpdateListItemDebounce } from '@/hooks/useUpdateListItemDebounce';
import { useUpdateRatingMark } from '@/hooks/useUpdateRatingMark';

import { numWord } from '@/utils/utils';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface ListItemProps {
  listId: string;
  listItem: Partial<IListItem>;
  onDelete?: () => void;
  isEdit?: boolean;
}

export function ListItem({
  listItem,
  listId,
  isEdit,
  onDelete,
}: ListItemProps) {
  const {
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<{ title: string; creatingTitle: string }>({
    defaultValues: { title: listItem?.title },
    values: { title: listItem?.title ?? '', creatingTitle: '' },
  });
  const { createListItem } = useCreateListItem(listId);
  const { deleteListItem } = useDeleteListItem(listId);
  const { createRatingMark } = useCreateRatingMark(listId);
  const { updateRatingMark } = useUpdateRatingMark(listId);
  const { user } = useProfile();

  const authUserRatingMark = listItem?.ratingMarks?.find(
    ratingMark => ratingMark.authorId === user?.id,
  );

  const [isRatingMode, setIsRatingMode] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    if (!authUserRatingMark) return null;
    return authUserRatingMark.value - 1;
  });

  useUpdateListItemDebounce({ watch, listItemId: listItem?.id });

  const handleClickEdit = () => setFocus('title');
  const handleCreateListItem = () => {
    createListItem({ title: watch('creatingTitle'), listId });
    onDelete?.();
  };
  const handleDeleteListItem = () => deleteListItem(listItem?.id ?? '');
  const handleRatingMode = () => setIsRatingMode(prev => !prev);
  const handleStarMouseOver = (index: number) => setHoverIndex(index);
  const handleStarMouseLeave = () => setHoverIndex(null);
  const handleStarSelect = (index: number) => {
    if (!listItem.id) return;

    setSelectedIndex(index);

    if (authUserRatingMark) {
      updateRatingMark({
        listItemId: listItem.id,
        value: index + 1,
        ratingMarkId: authUserRatingMark.id,
      });
    } else {
      createRatingMark({ listItemId: listItem.id, value: index + 1 });
    }

    setIsRatingMode(false);
  };

  return (
    <>
      {!isEdit && (
        <Card
          width='full'
          height='fit'
          className='flex flex-shrink-0 flex-col gap-[16px] overflow-hidden rounded-sm border-2 border-black-stroke pt-[16px]'
        >
          <div className='flex flex-col gap-[8px] px-[16px]'>
            <div className='flex flex-1 items-center justify-between gap-[32px]'>
              <Input
                mode='clear'
                className='flex-1'
                classNames={{
                  input: 'p-0 font-light',
                }}
                {...register('title')}
              />
              <div className='flex gap-[12px]'>
                <Pencil
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                  onClick={handleClickEdit}
                />
                <Trash2
                  width={16}
                  height={16}
                  color='#6C6C6C'
                  className='cursor-pointer'
                  onClick={handleDeleteListItem}
                />
              </div>
            </div>

            {Boolean(listItem?.ratingMarks?.length) && (
              <p className='flex items-center gap-[8px]'>
                <span className='text-[14px] leading-[16px] text-yellow'>
                  {listItem.rating}
                </span>
                <span className='text-[12px] leading-[14px] text-text-grey'>
                  {listItem.ratingMarks?.length}{' '}
                  {numWord(
                    ['оценка', 'оценки', 'оценок'],
                    listItem.ratingMarks?.length,
                  )}
                </span>
              </p>
            )}
          </div>

          <div
            className={`flex w-full ${isRatingMode ? 'justify-between' : 'justify-end'} bg-black p-[16px]`}
          >
            {isRatingMode && (
              <div className='flex items-center gap-[4px]'>
                {new Array(5).fill(null).map((_, index) => {
                  const isHovered = hoverIndex !== null && index <= hoverIndex;
                  const isSelected =
                    selectedIndex !== null && index <= selectedIndex;

                  const starColor = isHovered
                    ? '#17C047'
                    : isSelected
                      ? '#0EA338'
                      : '#6C6C6C';

                  return (
                    <Star
                      key={index}
                      size={24}
                      color={starColor}
                      className='cursor-pointer'
                      onMouseOver={() => handleStarMouseOver(index)}
                      onMouseLeave={handleStarMouseLeave}
                      onClick={() => handleStarSelect(index)}
                    />
                  );
                })}
              </div>
            )}

            <p className='flex items-center gap-[10px] text-[14px] leading-[14px]'>
              <span
                className={`cursor-pointer font-semibold ${isRatingMode ? 'text-text-grey' : 'text-green-light'} font-montserrat`}
                onClick={handleRatingMode}
              >
                {authUserRatingMark && !isRatingMode
                  ? 'Изменить оценку'
                  : isRatingMode
                    ? 'Отмена'
                    : 'Оценить'}
              </span>
              {Boolean(authUserRatingMark) && !isRatingMode && (
                <span className='flex items-center gap-[4px] text-text-grey'>
                  <Star size={16} />
                  <span className=''>{authUserRatingMark?.value}</span>
                </span>
              )}
            </p>
          </div>
        </Card>
      )}

      {isEdit && (
        <div>
          <textarea
            {...register('creatingTitle')}
            placeholder='Введите текст'
            className='border-1 block min-h-[132px] w-full resize-none rounded-xs border-grey-stroke bg-black-middle py-1.5 font-light ring-green placeholder:text-[16px] placeholder:text-text-grey  focus:border-green focus:ring-green'
          />

          <div className='mt-[12px] flex justify-end gap-[14px]'>
            <Button
              size='fit'
              bg='grey'
              className='h-[44px] w-[44px] rounded-xs'
              onClick={onDelete}
            >
              <X />
            </Button>

            <Button
              size='fit'
              className='h-[44px] w-[44px] rounded-xs'
              onClick={handleCreateListItem}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
