import { Request, Response } from 'express';
import Resource from '../models/resource.model';

// Get all resources
export const getResources = async (_req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    res.json({ resources });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

// Create a new resource
export const createResource = async (req: Request, res: Response) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.json({ resource });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create resource' });
  }
};

// Delete a resource
export const deleteResource = async (req: Request, res: Response) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resource' });
  }
};