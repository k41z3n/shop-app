// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwt } from './utils'

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/checkout')) {
    const token = request.cookies.get('token')?.value || ''
    console.log('::::::startsWith checkout',token);
    const returnTo = request.nextUrl.pathname
    // const hasValidToken = await jwt.isValidToken(token)
    // console.log({hasValidToken});
    if(token === '')
      return NextResponse.redirect(new URL(`/auth/login?p=${returnTo}`,request.url))
    else
      return NextResponse.next()
    
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/cart/:path*','/checkout/:path*'],
}