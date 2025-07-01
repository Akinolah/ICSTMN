"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminReports = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// import Event from '../models/event.model';
const getAdminReports = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield user_model_1.default.find({ isAdmin: true });
        const reports = admins.map((admin) => ({
            adminIndex: typeof admin.adminIndex === 'number' ? admin.adminIndex : null, // Ensure adminIndex is a number
            name: admin.name,
            email: admin.email,
            eventsManaged: admin.eventsManaged || 0, // Replace with real data if available
            contentsUploaded: admin.contentsUploaded || 0, // Replace with real data if available
            lastActive: admin.lastActive || new Date().toLocaleString(), // Replace with real data if available
        }));
        res.json({ reports });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch admin reports' });
    }
});
exports.getAdminReports = getAdminReports;
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
