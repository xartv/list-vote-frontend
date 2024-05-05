import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ERating } from '@/types/list-item.types';

import { ratingMarkService } from '@/services/rating-mark.service';

export const useUpdateRatingMark = (listId: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateRatingMark } = useMutation({
    mutationFn: ({
      listItemId,
      value,
      ratingMarkId,
    }: {
      listItemId: string;
      ratingMarkId: string;
      value: ERating;
    }) =>
      ratingMarkService.updateRatingMark({ listItemId, value }, ratingMarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  return { updateRatingMark };
};
