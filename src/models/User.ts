import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  picture: string;
  email: string;
  openTime?: any[];
  reservationTime?: any[];
  expoPushToken?: string;
}

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  openTime: {
    type: Array,
  },
  reservationTime: {
    type: Array,
  },
  expoPushToken: {
    type: String,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
