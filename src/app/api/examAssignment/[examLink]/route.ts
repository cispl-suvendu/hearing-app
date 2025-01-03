import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import ExamAssignment from '@/models/examAssignment';
const SECRET = process.env.EXAM_SECRET || 'default_secret'
import jwt from 'jsonwebtoken'


export async function POST(req: Request, { params }: { params: Promise<{ examLink: string }> }) {
    try {
        const examLink = (await params).examLink

        if (!examLink) {
            return NextResponse.json(
                { success: false, message: 'Missing exam link.' },
                { status: 400 }
            );
        }

        // Verify JWT token
        jwt.verify(examLink, SECRET);

        const body = await req.json();
        const { answer } = body;

        if (!answer) {
            return NextResponse.json(
                { success: false, message: 'Missing answer.' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDB();

        // Fetch the assignment
        const currentAssignment = await ExamAssignment.findOne({ examLink }).populate({
            path: 'examId',
            populate: {
                path: 'questions',
                select: 'questionText options_A options_B options_C options_D isCorrect',
            },
        });

        if (!currentAssignment) {
            return NextResponse.json(
                { success: false, message: 'Assignment not found.' },
                { status: 404 }
            );
        }

        if (currentAssignment.status !== 'assigned') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized or invalid assignment status.' },
                { status: 403 }
            );
        }

        // Calculate result
        const totalMarks = currentAssignment.examId.questions.length;
        let score = 0;
        const result = currentAssignment.examId.questions.map((question: any) => {
            const submittedAnswer = answer.find(
                (ans: any) => ans.questionId === question._id.toString()
            );

            const isCorrect = submittedAnswer?.correctAns.toLowerCase() === question.isCorrect.toLowerCase();
            if (isCorrect) score++;

            return {
                ...question.toObject(),
                isSelected: submittedAnswer?.correctAns || '',
                isAnsCorrect: isCorrect,
            };
        });

        // Update assignment details
        currentAssignment.status = 'completed';
        currentAssignment.answer = answer;
        currentAssignment.result = {
            total_marks: totalMarks,
            score: score,
            result: result,
        };

        await currentAssignment.save();

        return NextResponse.json(
            { success: true, message: 'Assignment submitted.' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error processing POST request:', error);

        return NextResponse.json(
            { success: false, message: 'Internal server error.', error: error.message },
            { status: 500 }
        );
    }
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

            if (assignments.length === 0) {
                return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
            }

        return NextResponse.json({ success: true, data: assignments }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: 'Failed to retrieve assignments.', error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ examLink: string }> }) {
    // Await the params
    const examLink = (await params).examLink

    try {
        await connectToDB();
        const assignments = await ExamAssignment.findByIdAndDelete(examLink);

        if (!assignments) {
            return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Assignment deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}