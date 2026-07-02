// TEMPORARILY DISABLED FOR TESTING
// Uncomment to re-enable

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//   });

//   const pathname = req.nextUrl.pathname;
//   const isDashboard = pathname.startsWith("/dashboard");
//   const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

//   if (isDashboard && !token) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (isAuthPage && token) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register"],
// };

export default function middleware() {
  return;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
