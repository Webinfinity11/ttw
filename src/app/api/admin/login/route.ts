import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  adminCredentials,
  adminSessionToken,
  safeEqual,
} from '@/lib/admin-auth';

export async function POST(req: Request) {
  const creds = adminCredentials();
  if (!creds) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as { user?: string; password?: string } | null;
  const user = String(body?.user ?? '').trim();
  const password = String(body?.password ?? '');

  if (!safeEqual(user, creds.user) || !safeEqual(password, creds.password)) {
    // Небольшая задержка против перебора
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await adminSessionToken(creds.user, creds.password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return res;
}
