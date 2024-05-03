import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TUserListRequest } from '@/types/user-list.types';

import { userListService } from '@/services/user-list.service';

export const useAssignList = () => {
  const queryClient = useQueryClient();

  const { mutate: assignList } = useMutation({
    mutationFn: (dto: TUserListRequest) => userListService.assignList(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
    onError: () => {
      toast.error('Такого юзера не существует (');
    },
  });

  return { assignList };
};
