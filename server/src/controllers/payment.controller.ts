import { Request, Response } from 'express';
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

// POST /api/payment/verify
export const verifyPaymentAndRegister = async (req: Request, res: Response) => {
  try {
    const { reference, user } = req.body;

    // 1. Verify payment with Paystack
    const paystackRes = await verifyPaystack(reference);
    if (paystackRes.data.status !== 'success') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    // 2. Check if user already exists
    const existing = await User.findOne({ email: user.email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
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
    res.json({ success: true, userId: newUser._id });
  } catch (err: any) {
    res.status(500).json({ message: 'Payment verification or registration failed', error: err.message });
  }
};