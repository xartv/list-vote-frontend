import { useMutation, useQueryClient } from '@tanstack/react-query';

import { listService } from '@/services/list.service';

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteList } = useMutation({
    mutationFn: (listId: string) => {
      return listService.deleteList(listId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { deleteList };
};
