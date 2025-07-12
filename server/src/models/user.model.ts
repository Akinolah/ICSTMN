import mongoose, { Schema, Document, Types } from 'mongoose';

export type Role = 'User' | 'Admin' | 'Super Admin';
export type Status = 'active' | 'pending' | 'suspended';

export interface IUser extends Document {
  _id: Types.ObjectId;
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
  role: Role;
  joinDate: Date;
  status: Status;
  adminIndex?: number;
  eventsManaged?: number;
  contentsUploaded?: number;
  lastActive?: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },

  phone: { type: String, default: '' },
  profession: { type: String, default: '' },
  address: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  qualification: { type: String, default: '' },
  experience: { type: String, default: '' },
  referenceOne: { type: String, default: '' },
  referenceTwo: { type: String, default: '' },
  membershipType: { type: String, default: '' },
  organization: { type: String, default: '' },

  role: {
    type: String,
    enum: ['User', 'Admin', 'Super Admin'],
    default: 'User',
    index: true
  },

  joinDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'pending', 'suspended'],
    default: 'active',
  },

  adminIndex: { type: Number, default: null },
  eventsManaged: { type: Number, default: 0 },
  contentsUploaded: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
