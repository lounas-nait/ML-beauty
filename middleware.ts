import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_NAME } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isApi = request.nextUrl.pathname.startsWith('/api/admin');

  if (!token) {
    return isApi
      ? NextResponse.json({ error: 'Non authentifié.' }, { status: 401 })
      : NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    return isApi
      ? NextResponse.json({ error: 'Session invalide.' }, { status: 401 })
      : NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
