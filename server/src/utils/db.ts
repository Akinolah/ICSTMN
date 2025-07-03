import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';

// Load environment variables from .env file
dotenv.config();

// Ensure MONGODB_URI exists
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is missing in environment variables (.env file)");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if connection fails
  }
};

// Fastify plugin to connect to MongoDB
export async function dbPlugin(fastify: FastifyInstance) {
  await connectDB();
  fastify.decorate('mongoose', mongoose);
}
