import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { Category, Subcategory, Question, Exam, ExamAssignment } from "@/models";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const user = await User.findById(id);
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    // Await the params
    const { id } = await params;

    const { name, email, password, role } = await req.json();

    if (!name && !email && !password && !role) {
        return new Response(JSON.stringify({ error: "At least one field is required to update" }), { status: 400 });
    }

    try {
        await connectToDB();
        const user = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Await the params
    const { id } = await params;
  
    try {
        await connectToDB();
        const user = await User.findByIdAndDelete(id);
        await Category.deleteMany({ createdBy: id });
        await Subcategory.deleteMany({createdBy:id})
        await Question.deleteMany({createdBy:id})
        await Exam.deleteMany({createdBy:id})
        await ExamAssignment.deleteMany({assignedBy:id})
  
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
  
        return NextResponse.json({ success: true, message: "User deleted successfully"}, { status: 200 });
  
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }