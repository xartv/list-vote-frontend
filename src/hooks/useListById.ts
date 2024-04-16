import { useQuery } from '@tanstack/react-query';

import { listService } from '@/services/list.service';

export const useListById = (listId: string) => {
  const { data, status } = useQuery({
    queryKey: ['list', listId],
    queryFn: () => listService.getListById(listId),
  });

  return { data, status };
};
