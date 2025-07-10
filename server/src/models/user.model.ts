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
  organization?: string;

  // For both admins and users
  role: 'User' | 'Admin' | 'Super Admin';
  joinDate: string;
  status: 'active' | 'pending' | 'suspended';

  // Admin-specific fields
  isAdmin: boolean;
  adminIndex?: number;
  eventsManaged?: number;
  contentsUploaded?: number;
  lastActive?: string;
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
  organization: { type: String, default: '' },

  // Add these fields
  role: { type: String, enum: ['User', 'Admin', 'Super Admin'], default: 'User' },
  joinDate: { type: String, default: () => new Date().toISOString() },
  status: { type: String, enum: ['active', 'pending', 'suspended'], default: 'pending' },

  // Admin-related
  isAdmin: { type: Boolean, default: false },
  adminIndex: { type: Number, default: null },
  eventsManaged: { type: Number, default: 0 },
  contentsUploaded: { type: Number, default: 0 },
  lastActive: { type: String, default: '' },
});

export default mongoose.model<IUser>('User', UserSchema);
