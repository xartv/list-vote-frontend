import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { listService } from '@/services/list.service';

export const useUpdateList = () => {
  const [title, setTitle] = useState<string>();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: updateList } = useMutation({
    mutationFn: (listId: string) => listService.updateList({ title }, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      router.push('/lists');
    },
  });

  return {
    updateList,
    title,
    setTitle,
  };
};
