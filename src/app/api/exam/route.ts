// app/api/exams/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database'; // Ensure a MongoDB connection function
import Exam from '@/models/exam'; // Your Exam model
import Question from '@/models/question'; // Your Question model

export async function POST(req: Request) {
  await connectToDB();

  try {
    const body = await req.json();
    const { title, categoryId, subcategoryId, createdBy, difficulty, numQuestions, timeLimit } = body;

    // Step 1: Filter questions
    const questions = await Question.find({
      categoryId,
      subcategoryId,
      difficulty,
    });

    if (!questions.length) {
      return NextResponse.json({ success: false, message: 'No questions found for the specified criteria.' }, { status: 404 });
    }

    // Step 2: Random selection
    const selectedQuestions = questions
      .sort(() => 0.5 - Math.random()) // Randomize
      .slice(0, numQuestions)
      .map((q) => q._id); // Extract IDs

    // Step 3: Create new exam
    const newExam = await Exam.create({
      title,
      categoryId,
      subcategoryId,
      createdBy,
      difficulty,
      numQuestions: selectedQuestions.length,
      questions: selectedQuestions,
      timeLimit,
    });

    return NextResponse.json({ success: true, data: newExam, message: 'Exam Created.' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to create exam.', error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate items to skip


  try {
    // Fetch all exams
    await connectToDB();
    const totalExam = await Exam.countDocuments();
    const exams = await Exam.find().populate('questions').populate('categoryId').populate('subcategoryId').populate('createdBy', 'name email').sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit the number of documents;
    return NextResponse.json({
      success: true, data: exams, pagination: {
        total: totalExam,
        page,
        limit,
        totalPages: Math.ceil(totalExam / limit),
      }, status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to retrieve exams.', error: error.message }, { status: 500 });
  }
}
