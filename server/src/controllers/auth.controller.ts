// src/controllers/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/db';
import jwt from 'jsonwebtoken';

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return reply.status(400).send({ message: 'Email and password are required' });
  }

  // Supabase Auth Sign-In
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  // Get additional user info from profiles table (if needed)
  const { data: profile } = await supabase
    .from('profiles') // or 'users' depending on your schema
    .select('*')
    .eq('id', data.user.id)
    .single();

  const user = {
    id: data.user.id,
    email: data.user.email,
    name: profile?.name || '',
    role: profile?.role || 'user',
    membershipType: profile?.membershipType,
    phone: profile?.phone,
    joinDate: profile?.created_at,
    organization: profile?.organization,
    profession: profile?.profession,
    address: profile?.address,
    status: profile?.status,
  };

  // Generate JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  return reply.send({ user, token });
};
