import { useMutation, useQueryClient } from '@tanstack/react-query';

import { listService } from '@/services/list.service';

export const useCreateList = () => {
  const queryClient = useQueryClient();

  const { mutate: createList } = useMutation({
    mutationFn: (title: string) => listService.createList({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { createList };
};
