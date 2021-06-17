import { NotificationDTO } from 'src/DTO/notification/NotificationDTO';
import { Notification } from './notification.model';

export class NotificationPresenter {
  static toDTO(notification: Notification) {
    return new NotificationDTO(
      notification.id,
      notification.pictureId,
      notification.pictureOwnerId,
      notification.notificationUsername,
      notification.notificationDate,
      notification.notificationRead,
      notification.notificationType,
      notification.pictureLink,
    );
  }
}
