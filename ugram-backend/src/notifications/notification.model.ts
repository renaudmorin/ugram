import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  pictureId: { type: String, required: true },
  pictureOwnerId: { type: String, required: true},
  notificationUsername: { type: String, required: true },
  notificationDate: { type: Date, required: true },
  notificationRead: { type: Boolean, required: true},
  notificationType: { type: String, required: true },
  pictureLink: { type: String, required: true },
});

export interface Notification extends mongoose.Document {
  id: string;
  pictureId: string;
  pictureOwnerId: string;
  notificationUsername: string;
  notificationDate: Date;
  notificationRead: Boolean;
  notificationType: string;
  pictureLink: string;
}
