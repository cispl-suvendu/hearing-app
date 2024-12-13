import mongoose, { Model, Schema } from 'mongoose';
import { IExam } from '@/type';

const examSchema = new Schema<IExam>({
  title: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  difficulty: { type: Number, enum: [0, 1, 2, 3], required: true },
  numQuestions: { type: Number, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
  timeLimit: { type: Number, required: true }
}, { timestamps: true });


const Exam: Model<IExam> = mongoose.models.Exam || mongoose.model<IExam>('Exam', examSchema);

export default Exam;