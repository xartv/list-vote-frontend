import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { LISTS_PAGE } from '@/config/pages-url.config';

import { useUpdateList } from './useUpdateList';

interface IUseListDebounce {
  watch: UseFormWatch<{ title: string }>;
  listId?: string;
}

export const useUpdateListDebounce = ({ listId, watch }: IUseListDebounce) => {
  const { updateList } = useUpdateList();
  const router = useRouter();

  const debouncedUpdateList = useCallback(
    debounce((formData: { title?: string }) => {
      if (!listId) return;

      updateList({ title: formData.title, listId });
      router.push(`${LISTS_PAGE.EDIT_LIST}/${listId}`);
    }, 300),
    [],
  );

  useEffect(() => {
    console.log('work');

    const { unsubscribe } = watch(formData => debouncedUpdateList(formData));

    return () => {
      unsubscribe();
    };
  }, [watch, debouncedUpdateList]);
};
