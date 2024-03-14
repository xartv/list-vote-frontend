'use client';

import { Loader } from '@/components/Loader/Loader';

import { useProfile } from '@/hooks/useProfile';

export function Dashboard() {
  const { data, isPending } = useProfile();

  if (isPending) return <Loader />;

  return <div>email - ${data?.email}</div>;
}
