import { NextResponse } from "next/server";
import { Category, User, Subcategory, Exam, ExamAssignment, Question } from "@/models";

export async function GET() {
    try {
        // Execute independent queries concurrently
        const [
            totalCategory,
            totalSubCategory,
            totalUser,
            totalExam,
            totalAssigment,
            totalQuestion,
            completedAssinment,
            inProgressAssinment,
            recentCompletedAssinment
        ] = await Promise.all([
            Category.countDocuments(),
            Subcategory.countDocuments(),
            User.countDocuments(),
            Exam.countDocuments(),
            ExamAssignment.countDocuments(),
            Question.countDocuments(),
            ExamAssignment.countDocuments({ status: 'completed' }),
            ExamAssignment.countDocuments({ status: 'assigned' }),
            ExamAssignment.findOne({ status: 'completed' })
                .sort({ createdAt: -1 })
                .populate({ 
                    path: 'examId', 
                    populate: { 
                        path: 'questions', 
                        select: 'questionText options_A options_B options_C options_D' 
                    } 
                })
                .populate('assignedBy', 'name')
                .lean()
        ]);

        // Construct response
        const response = {
            success: true,
            data: {
                totalCategory,
                totalSubCategory,
                totalUser,
                totalExam,
                totalAssigment,
                totalQuestion,
                completedAssinment,
                inProgressAssinment,
                recentCompletedAssinment,
            },
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
