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
exports.deleteEvent = exports.createEvent = exports.getEvents = exports.getLatestEvents = void 0;
const event_model_1 = __importDefault(require("../models/event.model"));
// Get latest events for homepage
const getLatestEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const events = yield event_model_1.default.find().sort({ date: -1 }).limit(limit);
        res.json({ events });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch events', error: err.message });
    }
});
exports.getLatestEvents = getLatestEvents;
// Get all events
const getEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.default.find();
        res.json({ events });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});
exports.getEvents = getEvents;
// Create a new event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = new event_model_1.default(req.body);
        yield event.save();
        res.json({ event });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create event' });
    }
});
exports.createEvent = createEvent;
// Delete an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield event_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete event' });
    }
});
exports.deleteEvent = deleteEvent;
