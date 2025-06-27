import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;