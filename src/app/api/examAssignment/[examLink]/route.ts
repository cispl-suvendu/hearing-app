import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import ExamAssignment from '@/models/examAssignment';
const SECRET = process.env.EXAM_SECRET || 'default_secret'
import jwt from 'jsonwebtoken'

// POST method: Create a new assignment
export async function POST(req: Request) {
    return NextResponse.json(
        { success: true, message: 'user development' },
        { status: 200 }
    );
}

// GET method: Retrieve all assignments
export async function GET(req: Request, { params }: { params: Promise<{ examLink: string }> }) {


    try {
        // Parse the assignment ID from the URL if provided
        const examLink = (await params).examLink

        if (!examLink) {
            return NextResponse.json(
                { success: false, message: 'Missing assignment ID.' },
                { status: 400 }
            );
        }

        jwt.verify(examLink, SECRET)

        await connectToDB();

        // Fetch assignments with populated fields
        const assignments = await ExamAssignment.find({ examLink })
            .populate({
                path: 'examId',
                populate: {
                    path: 'questions',
                    select: 'questionText options_A options_B options_C options_D',
                },
            })
            .populate('assignedBy', 'name');

        return NextResponse.json({ success: true, data: assignments }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: 'Failed to retrieve assignments.', error: error.message },
            { status: 500 }
        );
    }
}
