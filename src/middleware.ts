import { NextRequest, NextResponse } from 'next/server';

import { DASHBOARD_PAGES, EXTERNAL_PAGES } from './config/pages-url.config';
import { ETokens } from './types/auth.types';

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const accessToken = cookies.get(ETokens.ACCESS_TOKEN)?.value;
  const isAuthPage = url.includes('auth');

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(EXTERNAL_PAGES.AUTH, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path'],
};
