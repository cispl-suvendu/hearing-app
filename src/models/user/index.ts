import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/type';


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;