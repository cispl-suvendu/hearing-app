import { connectToDB } from "@/lib/database";
import Subcategory from "@/models/subcategory";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDB();
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId");

        // Build query
        const query = categoryId ? { categoryId } : {};
        // Populate categoryId and createdBy fields
        const subcategories = await Subcategory.find(query)
            .populate("categoryId", "name")      // Populate categoryId with name field
            .populate("createdBy", "name email"); // Populate createdBy with name and email fields

        return NextResponse.json({ success: true, data: subcategories.reverse() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { name, categoryId, createdBy } = await req.json();

    if (!name || !categoryId || !createdBy) {
        return NextResponse.json({ success: false, error: "Name, categoryId, and createdBy are required" }, { status: 400 });
    }

    try {
        await connectToDB();
        const newSubcategory = new Subcategory({ name, categoryId, createdBy });
        await newSubcategory.save();

        return NextResponse.json({ success: true, data: newSubcategory }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
