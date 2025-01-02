import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, errors as joseErrors } from "jose"; // Updated: Import specific error types
import { NextRequest } from "next/server";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

const publicRoutes = ["/signin", "/about", "/help", "/api/examAssignment/:id"];
const adminRoutes = ["/dashboard", "/categories", "/questionnaires", "/user"];
const apiRoutes = ["/api/category", "/api/exam", "/api/examAssignment", "/api/question", "/api/subCategory", "/api/user"];

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("login_token")?.value || req.headers.get("Authorization")?.split(" ")[1];

    const url = req.nextUrl.clone();
    const { pathname } = url;

    console.log(`Middleware processing route: ${pathname}`); // Debugging

    if (pathname === "/signin" && token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Use jose to verify the JWT
            url.pathname = "/dashboard"; // Redirect logged-in user
            return NextResponse.redirect(url);
        } catch (error) {
            console.error("Token verification error:", error); // **Updated: Log token verification error**
        }
    }

    // Redirect '/' based on login status
    if (pathname === "/") {
        if (token) {
            try {
                const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
                url.pathname = "/dashboard"; // Redirect logged-in user
                return NextResponse.redirect(url);
            } catch (error) {
                console.error("Token verification error:", error); // **Updated: Handle all token verification errors**
                url.pathname = "/signin"; // Redirect on invalid or expired token
                return NextResponse.redirect(url);
            }
        } else {
            url.pathname = "/signin"; // No token present
            return NextResponse.redirect(url);
        }
    }

    // Allow access to public routes
    if (publicRoutes.some((route) => {
        const regex = new RegExp(`^${route.replace(/:id/, "[^/]+")}$`);
        return regex.test(pathname);
    })) {
        return NextResponse.next();
    }

    // Protect admin routes
    if (adminRoutes.some((route) => pathname === route)) {
        if (!token) {
            url.pathname = "/signin"; // Redirect to sign-in if no token
            return NextResponse.redirect(url);
        }

        try {
            await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
            return NextResponse.next();
        } catch (error) {
            if (error instanceof joseErrors.JWTExpired) { // **Updated: Handle expired tokens explicitly**
                console.error("Token expired:", error); // **Updated: Log expired token error**
                url.pathname = "/signin"; // Redirect expired tokens to sign-in
            } else {
                console.error("Invalid token:", error); // **Updated: Handle invalid tokens**
            }
            return NextResponse.redirect(url);
        }
    }

    // Protect API routes
    if (apiRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        try {
            await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
            return NextResponse.next();
        } catch (error) {
            if (error instanceof joseErrors.JWTExpired) { // **Updated: Handle expired tokens for API routes**
                console.error("Token expired:", error); // **Updated: Log expired token error**
                return new NextResponse("Unauthorized - token expired", { status: 401 });
            } else {
                console.error("Invalid token:", error); // **Updated: Log other token errors**
                return new NextResponse("Unauthorized token", { status: 401 });
            }
        }
    }

    // Default: allow access to other routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/((?!api|_next|static|favicon.ico|favicon.png).*)', '/api/:path*'],
};
