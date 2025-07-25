// import mongoose, { Schema, Document } from 'mongoose';

// export interface IEvent extends Document {
//   title: string;
//   description: string;
//   date: Date;
//   image: string;
//   type: 'event' | 'resource';
//   link: string;
// }

// const EventSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   date: { type: Date, required: false },
//   image: { type: String, required: true },
//   type: { type: String, enum: ['event', 'resource'], default: 'event' },
//   link: { type: String, required: true }
// });

// export default mongoose.model<IEvent>('Event', EventSchema);
