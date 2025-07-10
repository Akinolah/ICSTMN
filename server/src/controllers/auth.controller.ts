import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';


// USER REGISTRATION PRECHECK CONTROLLER
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

// USER LOGIN CONTROLLER
export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await User.findOne({ email, isAdmin: false }); // Ensure not admin
    if (!user) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

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
        membershipType: user.membershipType,
        joinDate: user.joinDate,
        phone: user.phone,
        status: user.status,
        profession: user.profession,
        organization: user.organization,
        address: user.address
      }
    });
  } catch (err: any) {
    reply.status(500).send({ message: 'Login failed', error: err.message });
  }
};
