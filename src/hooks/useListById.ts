import { useQuery } from '@tanstack/react-query';

import { listService } from '@/services/list.service';

export const useListById = (listId?: string) => {
  const { data: list, status: listStatus } = useQuery({
    queryKey: ['list', listId],
    queryFn: () => {
      if (!listId) return;

      return listService.getListById(listId);
    },
  });

  return { list, listStatus };
};
