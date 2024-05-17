import { useQuery } from '@tanstack/react-query';

import { userService } from '@/services/user.service';

export const useProfile = () => {
  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    staleTime: 1000 * 60 * 10,
  });

  return { isPending, error, user };
};
