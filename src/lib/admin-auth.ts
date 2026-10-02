// Сессия админки: в cookie лежит HMAC от логина, подписанный паролем.
// Смена ADMIN_PASSWORD автоматически разлогинивает все браузеры.
// Web Crypto — работает и в middleware (edge), и в route handlers.

export const ADMIN_COOKIE = 'ttw_admin';
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 дней

export function adminCredentials() {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  return user && password ? { user, password } : null;
}

export async function adminSessionToken(user: string, password: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`ttw-admin:${user}`));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
