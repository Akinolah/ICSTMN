import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// ADMIN REPORTS CONTROLLER
export const getAdminReports = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const admins = await User.find({ isAdmin: true });
    const reports = admins.map((admin) => ({
      adminIndex: admin.adminIndex || null,
      name: admin.name,
      email: admin.email,
      eventsManaged: admin.eventsManaged || 0,
      contentsUploaded: admin.contentsUploaded || 0,
      lastActive: admin.lastActive || new Date().toLocaleString(),
    }));
    reply.send({ reports });
  } catch (err: any) {
    reply.status(500).send({ message: 'Failed to fetch admin reports', error: err.message });
  }
};


// ADMIN LOGIN CONTROLLER
export const loginAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const admin = await User.findOne({ email, isAdmin: true });
    if (!admin) {
      return reply.status(400).send({ message: 'Invalid credentials (admin not found)' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    reply.status(200).send({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role, // "Admin" | "Super Admin"
        phone: admin.phone,
        organization: admin.organization,
        address: admin.address,
        lastActive: admin.lastActive || new Date().toISOString()
      }
    });
  } catch (err: any) {
    reply.status(500).send({ message: 'Admin login failed', error: err.message });
  }
};
