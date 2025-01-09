import { NextResponse } from "next/server";
import { Category, User, Subcategory, Exam, ExamAssignment, Question } from "@/models";
import { IExamAssignment } from "@/type";

export async function GET() {
    try {
        const totalCategory = await Category.countDocuments();
        const totalSubCategory = await Subcategory.countDocuments();
        const totalUser = await User.countDocuments()
        const totalExam = await Exam.countDocuments();
        const totalAssigment = await ExamAssignment.countDocuments();
        const totalQuestion = await Question.countDocuments()
        const completedAssinment = await ExamAssignment.countDocuments({status: 'completed'});
        const inProgressAssinment = await ExamAssignment.countDocuments({status: 'assigned'});
        const allAssignment = await ExamAssignment.find().sort({ createdAt: -1 }).populate({ path: 'examId', populate: { path: 'questions', select: 'questionText options_A options_B options_C options_D' } }).populate('assignedBy', 'name')
        const recentCompletedAssinment = allAssignment.find(((exam: IExamAssignment) => exam.status === 'completed'))
        return NextResponse.json({ success: true, data: { totalCategory, totalSubCategory, totalUser, totalExam, totalAssigment, totalQuestion, completedAssinment, inProgressAssinment, recentCompletedAssinment } }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}