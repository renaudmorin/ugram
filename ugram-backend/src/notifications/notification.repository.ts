import { Notification } from './notification.model';

export abstract class NotificationRepository {
  saveNotification: (
    pictureId: String,
    pictureOwnerId: String,
    notificationUsername: String,
    notificationDate: Date,
    notificationRead: Boolean,
    notificationType: String,
    pictureLink:string,
  ) => Promise<Notification>;
  findAll: (
    pictureOwnerId: string,
  ) => Promise<Notification[]>;
  findByNotificationId: (notificationId: string) => Promise<Notification>;
  deleteNotification: (notificationId: string) => Promise<any>;
  updateNotification: (notification: Notification) => Promise<Notification>;
  readUserNotification: (userId: string) => Promise<any>;
  deleteNotifications: (userId: string) => Promise<any>;
  deleteNotificationsByPictureId: (pictureId: string) => Promise<any>;
}
