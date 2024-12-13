import mongoose, { Model, Schema } from 'mongoose';
import { ICategory } from '@/type';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;