import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export const loginAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await User.findOne({ email });

    if (!user || (user.role !== 'Admin' && user.role !== 'Super Admin')) {
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

    const redirectTo = user.role === 'Super Admin' ? '/admin' : '/admin1';

    reply.status(200).send({
      token,
      redirectTo,
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
    // Get all admins including Super Admins
    const admins = await User.find({
      isAdmin: true,
      role: { $in: ['Admin', 'Super Admin'] }
    });

    // Format report data
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