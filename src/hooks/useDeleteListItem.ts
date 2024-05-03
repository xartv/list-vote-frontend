import { useMutation, useQueryClient } from '@tanstack/react-query';

import { listItemService } from '@/services/list-item.service';

export const useDeleteListItem = (listId: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteListItem } = useMutation({
    mutationFn: (listItemId: string) =>
      listItemService.deleteListItem(listItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  return {
    deleteListItem,
  };
};
