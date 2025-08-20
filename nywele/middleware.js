import { NextResponse } from 'next/server';

export function middleware(request) {
    const sessionCookie = request.cookies.get('admin_session');

    // If the user isn't authenticated and is trying to access the admin page, redirect them.
    if (!sessionCookie && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If a user is already authenticated and tries to go to the login page, redirect them.
    if (sessionCookie && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Allow the request to proceed.
    return NextResponse.next();
}

export const config = {
    // Apply middleware to these paths
    matcher: ['/admin/:path*', '/login'],
};