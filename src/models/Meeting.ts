import mongoose, { Document, Schema } from "mongoose";

interface IMeeting extends Document {
  title: string;
  location: string;
  startTime: string;
  status: string;
  requester: object;
  requestee: object;
  message?: string;
}

const MeetingSchema = new Schema<IMeeting>({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  requester: {
    type: Object,
    required: true,
  },
  requestee: {
    type: Object,
    required: true,
  },
  message: {
    type: String,
  },
});

export default mongoose.model<IMeeting>("Meeting", MeetingSchema);
