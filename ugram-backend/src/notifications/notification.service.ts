import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationPresenter } from './notification.presenter';
import { Notification } from './notification.model';
import { NotificationRepository } from './notification.repository';
import { CreateNotificationDTO } from 'src/DTO/notification/CreateNotificationDTO';
import { UpdateNotificationDTO } from 'src/DTO/notification/UpdateNotificationDTO';
import { NotificationDTO } from 'src/DTO/notification/NotificationDTO';
import notificationsStatusCache from 'src/users/users.notificationsStatusCache';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async addNotification(
    createNotificationDto: CreateNotificationDTO,
  ): Promise<string> {
    let result;
    try {
      result = await this.notificationRepository.saveNotification(
        createNotificationDto.pictureId,
        createNotificationDto.pictureOwnerId,
        createNotificationDto.notificationUsername,
        createNotificationDto.notificationDate,
        createNotificationDto.notificationRead,
        createNotificationDto.notificationType,
        createNotificationDto.pictureLink,
      );
      notificationsStatusCache.set(createNotificationDto.pictureOwnerId, true);
    } catch (error) {
      switch (error.code) {
        default:
          throw new BadRequestException(error.message);
      }
    }
    return result.id as string;
  }

  async updateNotification(
    notificationId: string,
    updateNotificationDto: UpdateNotificationDTO,
  ): Promise<NotificationDTO> {
    const updatedNotification = await this.findNotificationById(notificationId);
    if (updateNotificationDto.notificationRead) {
      updatedNotification.notificationRead =
        updateNotificationDto.notificationRead;
    }

    const updated = await this.notificationRepository.updateNotification(
      updatedNotification,
    );
    return NotificationPresenter.toDTO(updated);
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const result = await this.notificationRepository.deleteNotification(
      notificationId,
    );
    if (result.n === 0) {
      throw new NotFoundException('Could not find notification.');
    }
  }

  async getNotificationById(notificationId: string): Promise<NotificationDTO> {
    const notification = await this.findNotificationById(notificationId);
    return NotificationPresenter.toDTO(notification);
  }

  private async findNotificationById(
    notificationId: string,
  ): Promise<Notification> {
    let notification;
    try {
      notification = await this.notificationRepository.findByNotificationId(
        notificationId,
      );
    } catch (error) {
      throw new NotFoundException('Could not find Notification.');
    }
    if (!notification) {
      throw new NotFoundException('Could not find Notification.');
    }
    return notification;
  }
}
