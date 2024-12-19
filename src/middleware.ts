import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; // Import jwtVerify from 'jose'
import { NextRequest } from "next/server";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

const publicRoutes = ["/signin", "/about", "/help"];
const adminRoutes = ["/dashboard", "/categories", "/questionnaires", "/user"];
const apiRoutes = ["/api/category", "/api/exam", "/api/examAssignment", "/api/question", "/api/subCategory", "/api/user"];

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("login_token")?.value || req.headers.get("Authorization")?.split(" ")[1];

    const url = req.nextUrl.clone();
    const { pathname } = url;

    //console.log("Current pathname:", pathname, 'token', token);

    // Redirect '/' based on login status
    if (pathname === "/") {
        if (token) {
            try {
                const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Use jose to verify the JWT
                url.pathname = "/dashboard"; // Redirect logged-in user
                return NextResponse.redirect(url);
            } catch (error) {
                console.error("Invalid token:", error); // Log invalid token error
                url.pathname = "/signin"; // Invalid token
                return NextResponse.redirect(url);
            }
        } else {
            url.pathname = "/signin"; // No token present
            return NextResponse.redirect(url);
        }
    }

    // Allow access to public routes
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Protect admin routes
    if (adminRoutes.some((route) => pathname === route)) {
        if (!token) {
            url.pathname = "/signin"; // Redirect to sign-in if no token
            return NextResponse.redirect(url);
        }

        try {
            await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Verify token with jose
            return NextResponse.next();
        } catch {
            url.pathname = "/signin"; // Invalid token
            return NextResponse.redirect(url);
        }
    }

    // Protect API routes
    if (apiRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return new NextResponse("Unauthorized", { status: 500 });
        }

        try {
            await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
            return NextResponse.next();
        } catch {
            return new NextResponse("Unauthorized token", { status: 401 });
        }
    }

    // Default: allow access to other routes
    return NextResponse.next();
}


export const config = {
    matcher: ['/', '/((?!api|static|_next|favicon.ico).*)', '/api/:path*'],
};