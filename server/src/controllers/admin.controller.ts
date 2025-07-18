import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const loginAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await User.findOne({ email });

    if (!user || user.role !== 'admin') {
      return reply.status(400).send({ message: 'Invalid credentials (admin not found)' });
    }

    if (user.status !== 'active') {
      return reply.status(403).send({ message: 'Account is not active. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    reply.status(200).send({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        organization: user.organization,
        address: user.address,
        lastActive: user.lastActive,
        status: user.status
      }
    });
  } catch (err: any) {
    reply.status(500).send({ message: 'Admin login failed', error: err.message });
  }
};

export const getAdminReports = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const admins = await User.find({
      role: 'admin'
    });

    const reports = admins.map((admin) => ({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      phone: admin.phone,
      organization: admin.organization || 'N/A',
      eventsManaged: admin.eventsManaged || 0,
      contentsUploaded: admin.contentsUploaded || 0,
      lastActive: admin.lastActive || null,
      status: admin.status,
      adminIndex: admin.adminIndex ?? null
    }));

    return reply.status(200).send({ success: true, reports });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: 'Failed to fetch admin reports',
      error: error.message
    });
  }
};
