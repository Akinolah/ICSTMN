import { FastifyRequest, FastifyReply } from 'fastify';
import Event from '../models/event.model';

// Get latest events for homepage
export const getLatestEvents = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const limit = parseInt((request.query as any).limit) || 3;
    const events = await Event.find().sort({ date: -1 }).limit(limit);
    reply.send({ events });
  } catch (err: any) {
    reply.status(500).send({ message: 'Failed to fetch events', error: err.message });
  }
};

// Get all events
export const getEvents = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const events = await Event.find();
    reply.send({ events });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to fetch events' });
  }
};

// Create a new event
export const createEvent = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const event = new Event(request.body);
    await event.save();
    reply.send({ event });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to create event' });
  }
};

// Delete an event
export const deleteEvent = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await Event.findByIdAndDelete((request.params as any).id);
    reply.send({ success: true });
  } catch (err) {
    reply.status(500).send({ message: 'Failed to delete event' });
  }
};