import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIsAuthenticated } from "./app/lib/server/auth/amplify";
import { NextServer } from "@aws-amplify/adapter-nextjs";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/", "/login", "/signup", "/confirm-signup"];
  const adminPaths = ["/admin"];

  try {
    const context: NextServer.Context = {
      request,
      response: new Response(),
    };

    const user = await checkIsAuthenticated(context);

    if (!user && !publicPaths.includes(pathname)) {
      console.log("User is not authenticated, redirecting to login");
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (!user?.isAdmin && adminPaths.includes(pathname)) {
      console.log("User is not an admin, redirecting to dashboard");
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    if (publicPaths.includes(pathname) && user) {
      console.log("User is authenticated, redirecting to dashboard");
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    if (!publicPaths.includes(pathname)) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
