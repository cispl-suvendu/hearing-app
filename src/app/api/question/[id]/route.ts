import { connectToDB } from "@/lib/database";
import { Question } from "@/models";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Await the params
    const { id } = await params;

    try {
        await connectToDB();
        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Question deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}