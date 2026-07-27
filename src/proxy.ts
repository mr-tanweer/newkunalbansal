import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, isValidSessionCookie } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const valid = isValidSessionCookie(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (valid) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
