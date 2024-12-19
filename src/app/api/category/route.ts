import { connectToDB } from "@/lib/database";
import Category from "@/models/category";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {   
    try {
        await connectToDB();
        const categories = await Category.find().populate("createdBy", "name email");
        return NextResponse.json({ success: true, data: categories.reverse() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { name, createdBy, description } = await req.json();

    if (!name || !createdBy) {
        return NextResponse.json({ success: false, error: "Name and createdBy are required" }, { status: 400 });
    }

    try {
        await connectToDB();
        const newCategory = new Category({ name, createdBy, description });
        await newCategory.save();
        return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
