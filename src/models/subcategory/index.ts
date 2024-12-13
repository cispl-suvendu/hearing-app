import mongoose, { Model, Schema } from 'mongoose';
import { ISubcategory } from '@/type';


const subcategorySchema = new Schema<ISubcategory>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Subcategory: Model<ISubcategory> = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;