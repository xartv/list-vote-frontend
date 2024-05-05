import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { EXTERNAL_PAGES } from '@/config/pages-url.config';

import { authService } from '@/services/auth.service';

export const useLogout = () => {
  const router = useRouter();

  const { mutate: logout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push(EXTERNAL_PAGES.AUTH);
    },
  });

  return { logout };
};
