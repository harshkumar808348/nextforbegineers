import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {    // ✅ renamed to proxy
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
    const token = request.cookies.get('token')?.value || ""

    console.log("Path:", path)
    console.log("Token:", token ? "EXISTS" : "EMPTY")
    console.log("isPublicPath:", isPublicPath)

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}