import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

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