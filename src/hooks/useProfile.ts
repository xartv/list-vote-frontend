import { useQuery } from '@tanstack/react-query';

import { userService } from '@/services/user.service';

export const useProfile = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
  });

  return { isPending, error, data };
};