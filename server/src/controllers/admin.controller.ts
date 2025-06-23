import { Request, Response } from 'express';
import User from '../models/user.model';

export const getAdminReports = async (_req: Request, res: Response) => {
  try {
    const admins = await User.find({ isAdmin: true });
    const reports = admins.map((admin) => ({
      adminIndex: admin.adminIndex,
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