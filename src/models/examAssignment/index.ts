import mongoose, { Model, Schema } from 'mongoose';
import { IExamAssignment } from '@/type';

const examAssignmentSchema = new Schema<IExamAssignment>({
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['assigned', 'completed', 'reviewed'], required: true },
  examLink: String,
  answer:[],
  result: {type: Object},
}, { timestamps: true });



const ExamAssignment: Model<IExamAssignment> = mongoose.models.ExamAssignment || mongoose.model<IExamAssignment>('ExamAssignment', examAssignmentSchema);

export default ExamAssignment;