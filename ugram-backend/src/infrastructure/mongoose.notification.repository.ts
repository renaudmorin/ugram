import { NotificationRepository } from '../notifications/notification.repository';
import { Notification } from '../notifications/notification.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseNotificationRepository implements NotificationRepository {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ) {}

  deleteNotification(notificationId: string): Promise<any> {
    return this.notificationModel.deleteOne({ _id: notificationId }).exec();
  }

  findByNotificationId(notificationId: string): Promise<Notification> {
    return this.notificationModel.findById(notificationId).exec();
  }

  readUserNotification(userId: string): Promise<any> {
    return this.notificationModel.updateMany({ pictureOwnerId: userId }, { $set:{notificationRead: true} }).exec();
  }

  deleteNotificationsByPictureId(pictureId: string): Promise<any> {
    return this.notificationModel.deleteMany({ pictureId: pictureId }).exec();
  }

  saveNotification(
    pictureId: string,
    pictureOwnerId: string,
    notificationUsername: string,
    notificationDate: Date,
    notificationRead: Boolean,
    notificationType: String,
    pictureLink: string,
  ): Promise<Notification> {
    const newNotification = new this.notificationModel({
      pictureId,
      pictureOwnerId,
      notificationUsername,
      notificationDate,
      notificationRead,
      notificationType,
      pictureLink,
    });
    return newNotification.save();
  }

  updateNotification(notification: Notification): Promise<Notification> {
    return notification.save();
  }

  findAll(
    pictureOwnerId: string,
  ): Promise<Notification[]> {
    return this.notificationModel
      .find(pictureOwnerId ? { pictureOwnerId: pictureOwnerId } : {})
      .exec();
  }

  deleteNotifications(userId: string): Promise<any> {
    return this.notificationModel.deleteMany({ pictureOwnerId: userId }).exec();
  }
}
