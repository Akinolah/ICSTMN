import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

// Helper: Verify payment with Paystack
async function verifyPaystack(reference: string): Promise<any> {
  const url = `https://api.paystack.co/transaction/verify/${reference}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
  });
  return response.data;
}

// POST /api/payments/verify
export const verifyPaymentAndRegister = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { reference, user } = request.body as { reference: string; user: any };

    // 1. Verify payment with Paystack
    const paystackRes = await verifyPaystack(reference);
    if (paystackRes.data.status !== 'success') {
      return reply.status(400).send({ message: 'Payment not successful' });
    }

    // 2. Check if user already exists
    const existing = await User.findOne({ email: user.email });
    if (existing) {
      return reply.status(400).send({ message: 'User already exists. Please login.' });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // 4. Create user
    const newUser = new User({
      ...user,
      password: hashedPassword,
      isAdmin: false
    });
    await newUser.save();

    // 5. Respond success
    reply.send({ success: true, userId: newUser._id });
  } catch (err: any) {
    reply.status(500).send({ message: 'Payment verification or registration failed', error: err.message });
  }
};