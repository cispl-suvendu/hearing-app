import { connectToDB } from "@/lib/database";
import Subcategory from "@/models/subcategory";
import { NextResponse } from "next/server";
import { Question, Exam, ExamAssignment } from "@/models";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        await connectToDB();
        const subcategory = await Subcategory.findById(id)
            .populate("categoryId", "name")      // Populate categoryId with name field
            .populate("createdBy", "name email"); // Populate createdBy with name and email fields

        if (!subcategory) {
            return new Response(JSON.stringify({ error: "Subcategory not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(subcategory), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { name, categoryId, createdBy } = await req.json();

    if (!name && !categoryId && !createdBy) {
        return new Response(JSON.stringify({ error: "At least one field is required to update" }), { status: 400 });
    }

    try {
        await connectToDB();
        const subcategory = await Subcategory.findByIdAndUpdate(id, { name, categoryId, createdBy }, { new: true })
            .populate("categoryId", "name")      // Populate categoryId with name field
            .populate("createdBy", "name email"); // Populate createdBy with name and email fields

        if (!subcategory) {
            return new Response(JSON.stringify({ error: "Subcategory not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(subcategory), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        await connectToDB();
        const subcategory = await Subcategory.findByIdAndDelete(id);
        await Question.deleteMany({ subcategoryId: id })
        const assignmentsToDelete = await ExamAssignment.find()
            .populate({
                path: 'examId',
                match: { subcategoryId: id },
            });

        const filteredAssignments = assignmentsToDelete.filter((assignment) => assignment.examId !== null);

        // Extract the IDs of the assignments to delete
        const assignmentIds = filteredAssignments.map((assignment) => assignment._id);

        // Delete the filtered assignments
        await ExamAssignment.deleteMany({ _id: { $in: assignmentIds } });
        await Exam.deleteMany({ subcategoryId: id })


        if (!subcategory) {
            return NextResponse.json({ success: false, message: "Subcategory not found!" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Subcategory deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
