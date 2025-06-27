import { Request, Response } from 'express';
import User from '../models/user.model';
// import Event from '../models/event.model';

export const getAdminReports = async (_req: Request, res: Response) => {
  try {
    const admins = await User.find({ isAdmin: true });
    const reports = admins.map((admin) => ({
      adminIndex: typeof admin.adminIndex === 'number' ? admin.adminIndex : null, // Ensure adminIndex is a number
      name: admin.name,
      email: admin.email,
      eventsManaged: admin.eventsManaged || 0, // Replace with real data if available
      contentsUploaded: admin.contentsUploaded || 0, // Replace with real data if available
      lastActive: admin.lastActive || new Date().toLocaleString(), // Replace with real data if available
    }));
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin reports' });
  }
};

// Events Management
// export const getEvents = async (_req: Request, res: Response) => {
//   const events = await Event.find();
//   res.json({ events });
// };

// // Create a new event
// export const createEvent = async (req: Request, res: Response) => {
//   const event = new Event(req.body);
//   await event.save();
//   res.json({ event });
// };

// // Delete an event by ID
// export const deleteEvent = async (req: Request, res: Response) => {
//   await Event.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// };