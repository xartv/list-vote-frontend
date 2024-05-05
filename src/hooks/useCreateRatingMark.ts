import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ERating } from '@/types/list-item.types';

import { ratingMarkService } from '@/services/rating-mark.service';

export const useCreateRatingMark = (listId: string) => {
  const queryClient = useQueryClient();

  const { mutate: createRatingMark } = useMutation({
    mutationFn: ({
      listItemId,
      value,
    }: {
      listItemId: string;
      value: ERating;
    }) => ratingMarkService.createRatingMark({ listItemId, value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  return { createRatingMark };
};
