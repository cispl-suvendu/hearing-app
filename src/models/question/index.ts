import mongoose, { Model, Schema } from 'mongoose';
import { IQuestion } from '@/type';


const questionSchema = new Schema<IQuestion>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  questionText: { type: String, required: true },
  options_A: { type: String, required: true },
  options_B: { type: String, required: true },
  options_C: { type: String, required: true },
  options_D: { type: String, required: true },
  isCorrect:{ type: String, required: true },
  difficulty:  { type: Number, enum: [0, 1, 2, 3], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, 
{ timestamps: true });

const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', questionSchema);

export default Question;