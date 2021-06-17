import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationDTO } from 'src/DTO/notification/NotificationDTO';
import notificationsStatusCache from 'src/users/users.notificationsStatusCache';

import { NotificationPresenter } from './notification.presenter';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getAllNotifications(): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepository.findAll(null);
    return notifications.map((notification) =>
      NotificationPresenter.toDTO(notification),
    );
  }

  async readUserNotifications(
    userId: string,
  ): Promise<void> {
    await this.notificationRepository.readUserNotification(
      userId,
    );
  }

  async getNotificationsByOwnerId(
    pictureOwnerId: string,
  ): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepository.findAll(
      pictureOwnerId,
    );
    notificationsStatusCache.set(pictureOwnerId, false);

    return notifications.map((notification) =>
      NotificationPresenter.toDTO(notification),
    );
  }

  async deleteNotifications(
    userId: string,
    ): Promise<void> {
      const result = await this.notificationRepository.deleteNotifications(
        userId,
      );
      if (result.n === 0) {
        throw new NotFoundException('Could not find notification.');
      }
    }

  async deleteNotificationsByPictureId(
    pictureId: string,
    ): Promise<void> {
      const result = await this.notificationRepository.deleteNotificationsByPictureId(
        pictureId,
      );
    }
}
