import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, adminCredentials, adminSessionToken, safeEqual } from '@/lib/admin-auth';

// Временная защита админки до появления backend-авторизации.
// Логин и пароль задаются переменными окружения ADMIN_USER / ADMIN_PASSWORD.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const creds = adminCredentials();

  // Локально без переменных админка открыта, как раньше.
  if (!creds) {
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Admin is not configured', { status: 503 });
    }
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (cookie && safeEqual(cookie, await adminSessionToken(creds.user, creds.password))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
