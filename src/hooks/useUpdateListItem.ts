import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TListItemRequest } from '@/types/list-item.types';

import { listItemService } from '@/services/list-item.service';

export const useUpdateListItem = () => {
  const queryClient = useQueryClient();

  const { mutate: updateListItem } = useMutation({
    mutationFn: ({
      listItemId,
      newData,
    }: {
      listItemId: string;
      newData: TListItemRequest;
    }) => listItemService.updateListItem(listItemId, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { updateListItem };
};
