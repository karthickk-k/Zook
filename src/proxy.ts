import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
  let token = null;
  try {
    token = await getToken({ req, secret });
  } catch (err) {
    // If getToken fails (missing secret or other), log and continue as unauthenticated
    // This prevents a server 500 from bubbling up to the user-facing UI.
    // The protected-route redirect below will still run for unauthenticated users.
    // eslint-disable-next-line no-console
    console.error("getToken error:", err);
    token = null;
  }

  const { pathname } = req.nextUrl;
  const isProtectedRoute = pathname === "/cart" || pathname.startsWith("/cart/") || pathname === "/order" || pathname.startsWith("/order/");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/order"],
};