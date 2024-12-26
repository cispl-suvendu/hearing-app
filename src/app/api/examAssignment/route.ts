import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import ExamAssignment from '@/models/examAssignment';
import jwt from 'jsonwebtoken';
const SECRET = process.env.EXAM_SECRET || 'default_secret'
import { sendExamNotification } from '@/lib/examNotification';

// POST method: Create a new assignment
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { examId, userEmail, userName, assignedBy, status } = await req.json();

    // Secret key for JWT

    // JWT Payload
    const jwtPayload = {
      userEmail,
      userName,
    };

    // JWT Options
    const options = {
      expiresIn: '1y',  // Set expiration time to 1 year
    };

    // Generate JWT token
    const token = jwt.sign(jwtPayload, SECRET, options);



    // Create new assignment
    const newAssignment = await ExamAssignment.create({
      examId,
      userEmail,
      userName,
      assignedBy,
      status,
      examLink: token
    });

    const customerData = {
      name: newAssignment.userName,
      email: newAssignment.userEmail,
      link: newAssignment.examLink
    }

    await sendExamNotification({ customerData })

    return NextResponse.json({ success: true, data: newAssignment, message: `Exam assignment completed` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to create assignment.', error: error.message }, { status: 500 });
  }
}

// GET method: Retrieve all assignments
export async function GET(req: Request) {
  try {
    await connectToDB();
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");

    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
    const skip = (page - 1) * limit; // Calculate items to skip

    // Build query
    const query = examId ? { examId } : {};
    // Fetch all assignments

    const totalAssignments = await ExamAssignment.countDocuments(query);

    const assignments = await ExamAssignment.find(query)
      .populate({ path: 'examId', populate: { path: 'questions', select: 'questionText options_A options_B options_C options_D' } }).populate('assignedBy', 'name')
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit the number of documents;

    return NextResponse.json({
      success: true,
      data: assignments,
      pagination: {
        total: totalAssignments,
        page,
        limit,
        totalPages: Math.ceil(totalAssignments / limit),
      },
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to retrieve assignments.', error: error.message }, { status: 500 });
  }
}
