import { connectToDB } from "@/lib/database";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { Subcategory, Question, Exam, ExamAssignment } from "@/models";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const category = await Category.findById(id).populate("createdBy", "name email");

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: category }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Await the params
    const { id } = await params;

    const { name, createdBy, description } = await req.json();

    if (!name && !createdBy) {
        return NextResponse.json({ success: false, error: "At least one field is required to update" }, { status: 400 });
    }

    try {
        await connectToDB();
        const category = await Category.findByIdAndUpdate(id, { name, createdBy, description }, { new: true }).populate("createdBy", "name email");

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Category updated successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const category = await Category.findByIdAndDelete(id);
        await Subcategory.deleteMany({ categoryId: id })
        await Question.deleteMany({ categoryId: id })

        const assignmentsToDelete = await ExamAssignment.find()
            .populate({
                path: 'examId',
                match: { categoryId: id }, // Filter exams with the matching categoryId
            });

        const filteredAssignments = assignmentsToDelete.filter((assignment) => assignment.examId !== null);

        // Extract the IDs of the assignments to delete
        const assignmentIds = filteredAssignments.map((assignment) => assignment._id);

        // Delete the filtered assignments
        await ExamAssignment.deleteMany({ _id: { $in: assignmentIds } });

        await Exam.deleteMany({ categoryId: id })

        if (!category) {
            return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Category deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
