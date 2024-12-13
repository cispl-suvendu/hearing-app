import { connectToDB } from "@/lib/database";
import User from '@/models/user';
import { IUser } from "@/type";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const url = new URL(request.url);
    const endpoint = url.pathname; // Determine if it's a signup or signin route

    const { name, email, password } = await request.json();

    if (endpoint === '/api/user/signup') {
        // Signup Route
        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
        }

        try {
            await connectToDB();
            const saltRounds = 10; // Higher value means stronger but slower hashing
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const SECRET = process.env.NEXTAUTH_SECRET || 'default_secret';

            const jwtPayload = {
                email,
                name
            };

            const options = {
                expiresIn: '1m',  // Set expiration time to 1 month
            };

            const token = jwt.sign(jwtPayload, SECRET, options);

            const newUser = new User({ name, email, hashedPassword });
            await newUser.save();

            return NextResponse.json({ success: true, data: token, message: `User Created!` }, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ success: false, error: error.message, message: `Something went wrong` }, { status: 500 });
        }
    } else if (endpoint === '/api/user/signin') {
        // Signin Route
        if (!email || !password) {
            return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
        }

        try {
            await connectToDB();

            const user = await User.findOne({ email }) as IUser | null;

            if (!user) {
                return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
            }

            // Now TypeScript knows `user.hashedPassword` exists
            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

            if (!isPasswordValid) {
                return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
            }


            const SECRET = process.env.NEXTAUTH_SECRET || 'default_secret';

            const jwtPayload = {
                email: user.email,
                name: user.name,
            };

            const options = {
                expiresIn: '1m',  // Set expiration time to 1 month
            };

            const token = jwt.sign(jwtPayload, SECRET, options);

            return NextResponse.json({ success: true, data: token, message: `User signed in!` }, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ success: false, error: error.message, message: `Something went wrong` }, { status: 500 });
        }
    }

    return NextResponse.json({ success: false, error: 'Invalid endpoint' }, { status: 404 });
}
