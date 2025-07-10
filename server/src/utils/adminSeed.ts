import { FastifyInstance } from 'fastify';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

// Admin seed data
const admins = [
  { email: 'admin@icstmn.org.ng', password: 'Admin@1234', name: 'Admin One', adminIndex: 0 },
  { email: 'admin2@icstmn.org.ng', password: 'Admin@1234', name: 'Admin Two', adminIndex: 1 },
  { email: 'admin3@icstmn.org.ng', password: 'Admin@1234', name: 'Admin Three', adminIndex: 2 },
  { email: 'admin4@icstmn.org.ng', password: 'Admin@1234', name: 'Admin Four', adminIndex: 3 },
  { email: 'admin5@icstmn.org.ng', password: 'Admin@1234', name: 'Admin Five', adminIndex: 4 },
];

// User seed data
const user = {
  email: 'user@icstmn.org.ng',
  password: 'User@1234',
  name: 'Test User',
  phone: '08012345678',
  profession: 'Developer',
  address: '123 Street, Lagos',
  dateOfBirth: '1995-01-01',
  qualification: 'B.Sc. Computer Science',
  experience: '3 years',
  referenceOne: 'Ref A',
  referenceTwo: 'Ref B',
  membershipType: 'Premium',
  isAdmin: false,
};

// 🌱 Fastify plugin for auto-seeding
export async function adminSeedPlugin(fastify: FastifyInstance) {
  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      const hashed = await bcrypt.hash(admin.password, 10);
      await User.create({ ...admin, password: hashed, isAdmin: true });
      fastify.log.info(`Seeded admin: ${admin.email}`);
    }
  }

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    const hashed = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashed });
    fastify.log.info(`Seeded test user: ${user.email}`);
  }
}

// 🌱 Manual function for CLI use
export const seedAdmins = async () => {
  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      const hashed = await bcrypt.hash(admin.password, 10);
      await User.create({ ...admin, password: hashed, isAdmin: true });
      console.log(`Seeded admin: ${admin.email}`);
    }
  }

  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    const hashed = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashed });
    console.log(`Seeded test user: ${user.email}`);
  }
};
