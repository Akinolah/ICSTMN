import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../services/supabase.service';
import { errorHandler } from '../utils/errorHandler';

export class AdminController {
  static async getAdminReports(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const { data: admins, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw new Error(error.message);

      const adminUsers = admins.users.filter(
        (user) => user.user_metadata?.role === 'admin'
      );

      const reports = adminUsers.map((admin) => ({
        id: admin.id,
        name: admin.user_metadata?.name || 'N/A',
        email: admin.email!,
        role: admin.user_metadata?.role || 'user',
        phone: admin.user_metadata?.phone || 'N/A',
        organization: admin.user_metadata?.organization || 'N/A',
        lastActive: admin.user_metadata?.lastActive || null,
        status: admin.user_metadata?.status || 'active'
      }));

      reply.status(200).send({ success: true, reports });
    } catch (error) {
      errorHandler(error, reply);
    }
  }
}