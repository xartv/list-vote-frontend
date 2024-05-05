import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { listItemService } from '@/services/list-item.service';

export const useCreateListItem = (listId: string) => {
  const queryClient = useQueryClient();

  const { mutate: createListItem } = useMutation({
    mutationFn: ({ listId, title }: { title: string; listId: string }) =>
      listItemService.createListItem({ title, listId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { createListItem };
};
