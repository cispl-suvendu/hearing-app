import mongoose, { Document, Schema } from 'mongoose';
import { IUserAnswer } from '@/type';


const userAnswerSchema = new Schema<IUserAnswer>({
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedOption: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUserAnswer>('UserAnswer', userAnswerSchema);
