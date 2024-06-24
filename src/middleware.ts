// import { NextRequest, NextResponse } from 'next/server'
// import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('authjs.session-token')
  // const pathname = request.nextUrl.pathname

  // // logado nao acessa o login
  // if ((pathname === '/auth/login' || pathname === '/auth/register') && token) {
  //   return NextResponse.redirect(new URL(getUrl()))
  // }
  // // Deslogado nao acessa a home
  // if (pathname.includes('/') && !token && !pathname.includes('/auth/login') && !pathname.includes('/auth/register')) {
  //   return NextResponse.redirect(new URL(getUrl('auth/login')))
  // }
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }