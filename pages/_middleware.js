import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



// this function is to protect the authenticated route
// we already did the login and logout
// when user not loggd in we simple redirect them to the login page
export async function middleware(req) {
    // we get the token from the server
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    // we allow the user only if
    // token exists
    // token is not expired

    const {pathname} = req.nextUrl;
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();

    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

}