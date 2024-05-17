import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ERating } from '@/types/list-item.types';

import { ratingMarkService } from '@/services/rating-mark.service';

export const useCreateRatingMark = (listId: string) => {
  const queryClient = useQueryClient();

  const { mutate: createRatingMark } = useMutation({
    mutationFn: async ({
      listItemId,
      value,
    }: {
      listItemId: string;
      value: ERating;
    }) => await ratingMarkService.createRatingMark({ listItemId, value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return { createRatingMark };
};
