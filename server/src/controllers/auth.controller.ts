import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as { email: string; password: string };

    const user = await User.findOne({ email });

    if (!user || user.role !== 'user') {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      return reply.status(403).send({ message: 'Account is not active. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    reply.status(200).send({
      token,
      user: {
        id: user._id.toString(),
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


// Precheck if email exists before registration
export const precheckRegistration = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email } = request.body as { email: string };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already registered' });
    }

    return reply.send({ message: 'Email is available' });
  } catch (error: any) {
    return reply.status(500).send({ message: 'Precheck failed', error: error.message });
  }
};

// User registration
export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      profession,
      address,
      dateOfBirth,
      qualification,
      experience,
      referenceOne,
      referenceTwo,
      membershipType
    } = request.body as Partial<IUser>;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.status(400).send({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password!, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      profession,
      address,
      dateOfBirth,
      qualification,
      experience,
      referenceOne,
      referenceTwo,
      membershipType,
      role: 'user',
      isAdmin: false,
      status: 'pending',
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id.toString(), role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    reply.status(201).send({
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        membershipType: newUser.membershipType,
        status: newUser.status
      }
    });
  } catch (error: any) {
    reply.status(500).send({ message: 'Registration failed', error: error.message });
  }
};