import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const admins = [
  { email: 'admin1@ictng.org', password: 'Admin@1234', name: 'Admin One', adminIndex: 0 },
  { email: 'admin2@ictng.org', password: 'Admin@1234', name: 'Admin Two', adminIndex: 1 },
  { email: 'admin3@ictng.org', password: 'Admin@1234', name: 'Admin Three', adminIndex: 2 },
  { email: 'admin4@ictng.org', password: 'Admin@1234', name: 'Admin Four', adminIndex: 3 },
  { email: 'admin5@ictng.org', password: 'Admin@1234', name: 'Admin Five', adminIndex: 4 },
];

export const seedAdmins = async () => {
  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      const hashed = await bcrypt.hash(admin.password, 10);
      await User.create({ ...admin, password: hashed, isAdmin: true });
      console.log(`Seeded admin: ${admin.email}`);
    }
  }
};