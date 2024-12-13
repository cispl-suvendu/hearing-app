import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database'; // Ensure a MongoDB connection function
import Exam from '@/models/exam'; // Your Exam model


export async function GET(req: Request) {
  await connectToDB();

  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  try {
    // Fetch exam by ID
    const exam = await Exam.findById(id).populate('questions').populate('categoryId').populate('subcategoryId');

    if (!exam) {
      return NextResponse.json({ success: false, message: 'Exam not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: exam }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: 'Failed to retrieve exam.', error: error.message }, { status: 500 });
  }
}
