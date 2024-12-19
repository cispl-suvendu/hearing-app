import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const secretKey = process.env.NEXTAUTH_SECRET || "your-secret-key";
        const decoded = jwt.verify(token, secretKey);

        // You can access decoded token details here
        console.log("Decoded Token:", decoded);

        return NextResponse.json({ message: "Token is valid", user: decoded });
    } catch (err: any) {
        console.error("Token verification failed:", err.message);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
