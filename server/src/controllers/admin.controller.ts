import { FastifyRequest, FastifyReply } from 'fastify';
import User from '../models/user.model';

// Get admin reports
export const getAdminReports = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const admins = await User.find({ isAdmin: true });
    const reports = admins.map((admin) => ({
      adminIndex: typeof admin.adminIndex === 'number' ? admin.adminIndex : null,
      name: admin.name,
      email: admin.email,
      eventsManaged: admin.eventsManaged || 0,
      contentsUploaded: admin.contentsUploaded || 0,
      lastActive: admin.lastActive || new Date().toLocaleString(),
    }));
    reply.send({ reports });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to fetch admin reports' });
  }
};