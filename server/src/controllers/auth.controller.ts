import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Registration Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, ...rest } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, ...rest, isAdmin: false });
    await user.save();
    res.json({ success: true, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        adminIndex: user.adminIndex ?? null,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // 4. Respond with token and user info
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        adminIndex: user.isAdmin ? user.adminIndex : null,
        membershipType: user.membershipType ?? null,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed', error: err });
  }
};



// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     // Include isAdmin and adminIndex in the JWT payload and response
//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin, adminIndex: user.adminIndex ?? null },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1d' }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         isAdmin: user.isAdmin,
//         adminIndex: user.isAdmin ? user.adminIndex : null,
//         membershipType: user.membershipType ?? null
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err });
//   }
// };