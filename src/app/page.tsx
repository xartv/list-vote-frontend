import { redirect } from 'next/navigation';

import { LISTS_PAGE } from '@/config/pages-url.config';

export default function Home() {
  redirect(LISTS_PAGE.HOME);
}
