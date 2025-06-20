import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  profession: string;
  address: string;
  dateOfBirth: string;
  qualification: string;
  experience: string;
  referenceOne: string;
  referenceTwo: string;
  membershipType: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  profession: String,
  address: String,
  dateOfBirth: String,
  qualification: String,
  experience: String,
  referenceOne: String,
  referenceTwo: String,
  membershipType: String,
  isAdmin: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);