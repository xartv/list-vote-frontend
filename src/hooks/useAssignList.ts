import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TUserListRequest } from '@/types/user-list.types';

import { userListService } from '@/services/user-list.service';

export const useAssignList = () => {
  const queryClient = useQueryClient();

  const { mutate: assignList } = useMutation({
    mutationFn: (dto: TUserListRequest) => userListService.assignList(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { assignList };
};
