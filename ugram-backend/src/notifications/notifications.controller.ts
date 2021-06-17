import { Controller, Get, Param, Patch, Delete } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getAllNotifications() {
    return await this.notificationsService.getAllNotifications();
  }

  @Get(':ownerId')
  async getNotifications(@Param('ownerId') ownerId: string) {
    return await this.notificationsService.getNotificationsByOwnerId(ownerId);
  }

  @Patch(':userId')
  async readUserNotification(
    @Param('userId') userId: string){
    return await this.notificationsService.readUserNotifications(userId);
  }

  @Delete(':userId')
    async removeNotification(@Param('userId') userId: string) {
      await this.notificationsService.deleteNotifications(userId);
      return null;
    }

    @Delete('/picture/:pictureId')
    async deleteNotificationsByPictureId(@Param('pictureId') pictureId: string) {
      await this.notificationsService.deleteNotificationsByPictureId(pictureId);
      return null;
    }
}
