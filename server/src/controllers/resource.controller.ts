import { FastifyRequest, FastifyReply } from 'fastify';
import Resource from '../models/resource.model';

// Get all resources
export const getResources = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const resources = await Resource.find();
    reply.send({ resources });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to fetch resources' });
  }
};

// Create a new resource
export const createResource = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const resource = new Resource(request.body);
    await resource.save();
    reply.send({ resource });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to create resource' });
  }
};

// Delete a resource
export const deleteResource = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    await Resource.findByIdAndDelete(id);
    reply.send({ success: true });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to delete resource' });
  }
};