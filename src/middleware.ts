import { NextResponse, type NextRequest } from "next/server";

// Временная защита админки (HTTP Basic Auth) до появления backend-авторизации.
// Логин и пароль задаются переменными окружения ADMIN_USER / ADMIN_PASSWORD.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  // Локально без переменных админка открыта, как раньше.
  if (!user || !password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin is not configured", { status: 503 });
    }
    return NextResponse.next();
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    if (u === user && rest.join(":") === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Tiling Work Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
