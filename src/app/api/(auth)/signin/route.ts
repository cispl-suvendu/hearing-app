import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import { IUser } from "@/type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function POST(request: Request) {
    const cookieStore = await cookies()

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

        // const response = NextResponse.json(
        //     { success: true, message: "User signed in!" },
        //     { status: 200 }
        // );

         // cookieStore.set({
        //     name: 'token',
        //     value: token,
        //     httpOnly: true,
        //     path: '/',
        //   })


        // // Set the token as an HTTP-only cookie
        // response.cookies.set("token", token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 7 * 24 * 60 * 60, // 7 days
        //     path: "/", // Make the cookie available across the entire site
        // });

        // return response;

        const response = NextResponse.json({ message: "Login successful", success:true });

        // Set the token as an httpOnly cookie
        // response.cookies.set("token", token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 7 * 24 * 60 * 60, // 7 days
        //     path: "/", // Available site-wide
        // });

        cookieStore.set({
            name: 'name',
            value: 'lee',
            httpOnly: true,
            path: '/',
          })

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
