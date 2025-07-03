import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Precheck Registration Controller
export const precheckRegistration = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email } = request.body as { email: string };
    const existing = await User.findOne({ email });
    if (existing) {
      return reply.status(400).send({ message: 'User already exists. Please login.' });
    }
    reply.send({ ok: true });
  } catch (err: any) {
    reply.status(500).send({ message: 'Precheck failed', error: err.message });
  }
};

// Login Controller
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // 4. Return token and user info (omit password)
    reply.send({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        membershipType: user.membershipType,
        // add other fields as needed
      }
    });
  } catch (err: any) {
    reply.status(500).send({ message: 'Login failed', error: err.message });
  }
};