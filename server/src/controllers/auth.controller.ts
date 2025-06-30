import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

//Registration Controller for payment after registration
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { email, password, ...rest } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed, ...rest, isAdmin: false });
//     await user.save();
//     res.json({ success: true, userId: user._id });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err });
//   }
// };

// Precheck Registration Controller
export const precheckRegistration = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ message: 'Precheck failed', error: err.message });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // 4. Return token and user info (omit password)
    res.json({
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
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};
