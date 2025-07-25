import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/supabase.service';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import { errorHandler } from '../utils/errorHandler';

export class AuthController {
  static async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password, role } = request.body as LoginRequest;
      const authData = await AuthService.login(email, password, role);
      
      const response: LoginResponse = {
        user: authData.user,
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at
        }
      };

      reply.status(200).send(response);
    } catch (error) {
      errorHandler(error, reply);
    }
  }
}