import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register']
  const isPublicPath = publicPaths.includes(path)

  // Protected paths that require authentication
  const protectedPaths = ['/home', '/dashboard']
  const isProtectedPath = protectedPaths.some(prefix => 
    path.startsWith(prefix)
  )

  // Redirect authenticated users trying to access login/register pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/home', '/dashboard/:path*']
} 