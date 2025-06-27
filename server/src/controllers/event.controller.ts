import { Request, Response } from 'express';
import Event from '../models/event.model';

// Get all events
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ event });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};