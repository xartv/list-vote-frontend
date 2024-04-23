import { NextRequest, NextResponse } from 'next/server';

import { EXTERNAL_PAGES, LISTS_PAGE } from './config/pages-url.config';
import { ETokens } from './constants/auth.constants';

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refresh = cookies.get(ETokens.REFRESH_TOKEN)?.value;
  const isAuthPage = url.includes('auth');

  if (isAuthPage && refresh) {
    return NextResponse.redirect(new URL(LISTS_PAGE.HOME, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refresh) {
    return NextResponse.redirect(new URL(EXTERNAL_PAGES.AUTH, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/lists/:path*', '/auth/:path'],
};
