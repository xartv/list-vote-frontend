import { useQuery } from '@tanstack/react-query';

import { listService } from '@/services/list.service';

export const useLists = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['lists'],
    queryFn: () => listService.getAvailableLists(),
  });

  return { isPending, error, data };
};
