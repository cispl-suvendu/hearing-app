import { connectToDB } from "@/lib/database";
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    const { name, email, password } = await request.json();

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
            expiresIn: '1m',
        };

        const token = jwt.sign(jwtPayload, SECRET, options);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const sendData = {
            newUser,
            token: token
        }

        return NextResponse.json({ success: true, data: sendData, message: `User Created!` }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message, message: `Something went wrong` }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDB();
        const allUser = await User.find();
        return NextResponse.json({ success: true, data: allUser.reverse() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}