import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/main/home'];
const publicRoutes = ['/auth/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // Ambil token dari cookie
  const tokenCookie = req.cookies.get('token');
  let token = tokenCookie ? tokenCookie.value : null;
  console.log("ini token >>>>", token)

  // ini  pengambilan tokenJika tidak ada token di cookie, coba ambil dari header Authorization
  // if (!token) {
  //   const authHeader = req.headers.get('Authorization');
  //   if (authHeader && authHeader.startsWith('Bearer ')) {
  //     token = authHeader.substring(7); // Ambil token tanpa kata 'Bearer '
  //   }
  // }

  let session = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      console.log("INI PAYLOAD >>",secret)
      session = payload;
    } catch (error) {
      console.error('JWT verification failed:', error);
    }
  }

  // Redirect to login if accessing protected route without valid session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // Redirect to main home if accessing public route with valid session
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/main/home', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'], 
};
