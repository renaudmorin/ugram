import * as mongoose from 'mongoose';
import { Comment } from 'src/DTO/picture/comment.model';

export const PictureSchema = new mongoose.Schema({
  pictureUrl: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: (d: String) => d === null },
  hashtags: { type: [String], required: true },
  mentions: { type: [String], required: true },
  creationDate: { type: Date, required: true },
  likes: { type: [String], required: true },
  comments: { type: [], required: true },
});

export interface Picture extends mongoose.Document {
  id: string;
  pictureUrl: string;
  userId: string;
  description: string;
  hashtags: string[];
  mentions: string[];
  creationDate: Date;
  likes: string[];
  comments: Comment[];
}
