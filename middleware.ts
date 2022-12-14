import { NextResponse, NextRequest } from "next/server";
import {getToken} from "next-auth/jwt";

// import { jwtVerify } from "jose";


export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const requestPage = req.nextUrl.pathname

  if (!session) {
    return NextResponse.redirect(new URL(`/auth/login?p=${requestPage}`, req.url))
  }

  return NextResponse.next()




  // const jwt = request.cookies.get("token")?.value;
  
  // const requestPage = request.nextUrl.pathname

  // if (request.nextUrl.pathname.startsWith('/checkout')) {
  //   if (!jwt) return NextResponse.redirect(new URL(`/auth/login?p=${requestPage}`, request.url));
  
  //   try {
  //     const { payload } = await jwtVerify(
  //       jwt,
  //       new TextEncoder().encode(process.env.SECRET_JWT || '')
  //     );
      
  
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(new URL(`/auth/login?p=${requestPage}`, request.url));
  //   }
  // }

}

export const config = {
  matcher: ['/cart/:path*','/checkout/:path*'],
};

// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import {  jwtVerify, type JWTPayload } from 'jose';


// export async function middleware(request: NextRequest) {

//   if (request.nextUrl.pathname.startsWith('/checkout')) {
//     const token = request.cookies.get('token')?.value || ''
//     console.log('::::::startsWith checkout',token);
//     const returnTo = request.nextUrl.pathname
//     // const hasValidToken = await jwt.joseIsValidToken(token)
//     const hasValidToken = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT || ''));
//     console.log('---->>>>',{hasValidToken});
//     if(token === '')
//       return NextResponse.redirect(new URL(`/auth/login?p=${returnTo}`,request.url))
//     else
//       return NextResponse.next()
    
//   }

// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/cart/:path*','/checkout/:path*'],
// }