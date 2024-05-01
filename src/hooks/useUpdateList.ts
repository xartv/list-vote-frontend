import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { listService } from '@/services/list.service';

export const useUpdateList = () => {
  const queryClient = useQueryClient();

  const { mutate: updateList } = useMutation({
    mutationFn: ({ title, listId }: { listId: string; title?: string }) =>
      listService.updateList({ title }, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return {
    updateList,
  };
};
