import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>('User', userSchema);