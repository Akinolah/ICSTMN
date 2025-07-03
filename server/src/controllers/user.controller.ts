import { FastifyRequest, FastifyReply } from 'fastify';
import User from '../models/user.model';

// Get all users
export const getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await User.find();
    reply.send({ users });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to fetch users' });
  }
};

// Delete a user
export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to delete user' });
  }
};