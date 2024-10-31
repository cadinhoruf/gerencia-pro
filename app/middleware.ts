import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const tenantId = req.headers.get('x-tenant-id') || req.cookies.get('tenantId')?.value

  const token = req.cookies.get('token')?.value

  if (!tenantId) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const response = NextResponse.next()
  response.headers.set('x-tenant-id', tenantId)

  return response
}

export const config = {
  matcher: ['/api/:path*']
}
