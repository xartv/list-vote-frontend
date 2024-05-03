import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useUpdateList } from './useUpdateList';
import { useUpdateListItem } from './useUpdateListItem';

interface IUseListItemDebounce {
  watch: UseFormWatch<{ title: string; creatingTitle: string }>;
  listItemId?: string;
}

export const useUpdateListItemDebounce = ({
  listItemId,
  watch,
}: IUseListItemDebounce) => {
  const { updateListItem } = useUpdateListItem();

  const debouncedUpdateListItem = useCallback(
    debounce((formData: { title?: string }) => {
      if (!listItemId) return;

      updateListItem({ listItemId, newData: { title: formData.title } });
    }, 300),
    [],
  );

  useEffect(() => {
    const { unsubscribe } = watch(formData =>
      debouncedUpdateListItem(formData),
    );

    return () => {
      unsubscribe();
    };
  }, [watch, debouncedUpdateListItem]);
};
