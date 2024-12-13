import { NextResponse } from "next/server";
import Question from "@/models/question";
import * as XLSX from "xlsx";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/database";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate items to skip

  try {
    await connectToDB();

    const totalQuestions = await Question.countDocuments(); // Total number of questions
    const questions = await Question.find()
      .populate("createdBy", "name email")
      .populate("categoryId", "name _id")
      .populate("subcategoryId", "name _id")
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit the number of documents

    return NextResponse.json(
      {
        success: true,
        data: questions,
        pagination: {
          total: totalQuestions,
          page,
          limit,
          totalPages: Math.ceil(totalQuestions / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    // Parse the form-data request
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const categoryId = formData.get("categoryId") as string;
    const subcategoryId = formData.get("subcategoryId") as string;
    const createdBy = formData.get("createdBy") as string;

    // Validate input
    if (!file || !categoryId || !subcategoryId || !createdBy) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    // Read the uploaded file
    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse the file using SheetJS
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });

    // Map the parsed data to the Question model schema
    const questions = data.map((row: any) => ({
      categoryId: new mongoose.Types.ObjectId(categoryId),
      subcategoryId: new mongoose.Types.ObjectId(subcategoryId),
      questionText: row.Question || "",
      options_A: row["Option- A"] || "",
      options_B: row["Option- B"] || "",
      options_C: row["Option- C"] || "",
      options_D: row["Option- D"] || "",
      isCorrect: row["Right option"] || "",
      difficulty: parseInt(row.Complexity) || 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    }));

    // Save the data to the database
    const savedQuestions = await Question.insertMany(questions);

    return NextResponse.json({ message: "Questions imported successfully", data:savedQuestions , success:true});
  } catch (error:any) {
    console.error("Error importing data:", error);
    return NextResponse.json({ error: error.message, success:false }, { status: 500 });
  }
}
