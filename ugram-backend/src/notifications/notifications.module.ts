import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationSchema } from './notification.model';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationPresenter } from './notification.presenter';
import { NotificationRepository } from './notification.repository';
import { MongooseNotificationRepository } from '../infrastructure/mongoose.notification.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
  controllers: [NotificationController, NotificationsController],
  providers: [
    NotificationsService,
    NotificationService,
    NotificationPresenter,
    {
      provide: NotificationRepository,
      useClass: MongooseNotificationRepository,
    },
  ],
})
export class NotificationsModule {}
