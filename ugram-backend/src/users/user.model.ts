import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  profilePictureUrl: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: (d: String) => d === null },
  registrationDate: { type: Date, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  profilePictureUrl: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;
}
