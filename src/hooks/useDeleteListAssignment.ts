import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TUserListRequest } from '@/types/user-list.types';

import { userListService } from '@/services/user-list.service';

export const useDeleteListAssignment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteListAssignment } = useMutation({
    mutationFn: (dto: TUserListRequest) =>
      userListService.deleteAssignment(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return { deleteListAssignment };
};
