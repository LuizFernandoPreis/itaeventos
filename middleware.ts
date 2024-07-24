import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('nextauth.token')
  if (!cookie) return NextResponse.redirect(new URL('/signin', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!signin|signup)):path*',
}