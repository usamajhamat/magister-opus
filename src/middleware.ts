import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

function secret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "");
}

async function hasRole(request: NextRequest, cookieName: string, role: string): Promise<boolean> {
  const token = request.cookies.get(cookieName)?.value;
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === role;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!(await hasRole(request, "mo_admin", "admin"))) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/student/dashboard")) {
    if (!(await hasRole(request, "mo_student", "student"))) {
      const url = request.nextUrl.clone();
      url.pathname = "/student";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/dashboard", "/student/dashboard/:path*"],
};
