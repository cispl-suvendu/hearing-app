"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

export const getUserInfo = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("login_token")?.value;

    if (!token) {
        throw new Error("Token is missing or undefined.");
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        return payload;
    } catch (error) {
        throw new Error("Invalid or expired token.");
    }
};
