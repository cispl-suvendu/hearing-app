import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import { IUser } from "@/type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
 
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
        return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    try {
        await connectToDB();

        const user = await User.findOne({ email }) as IUser | null;

        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, error: "Invalid Password" }, { status: 401 });
        }

        const SECRET = process.env.NEXTAUTH_SECRET || "default_secret";

        const jwtPayload = {
            email: user.email,
            name: user.name,
            id: user._id
        };

        const options = {
            expiresIn: "7d", // Set expiration time to 7 days
        };

        const token = jwt.sign(jwtPayload, SECRET, options);

        return NextResponse.json(
            { success: true, message: "User signed in!", data: token },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
