import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  password: string;
  isActive: boolean;
  refreshToken?: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  isActive: { type: Boolean, default: false }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
