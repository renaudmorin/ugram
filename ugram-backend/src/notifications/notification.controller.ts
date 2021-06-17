import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  
  import { NotificationService } from './notification.service';
  import { ApiTags } from '@nestjs/swagger';
  import { CreateNotificationDTO } from '../DTO/notification/CreateNotificationDTO';
  import { UpdateNotificationDTO } from '../DTO/notification/UpdateNotificationDTO';
  import { NotificationDTO } from '../DTO/notification/NotificationDTO';
  
  @ApiTags('Notification')
  @Controller('notification')
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}
  
    @Post()
    async addNotification(@Body() createNotificationDto: CreateNotificationDTO) {
      const generatedId = await this.notificationService.addNotification(createNotificationDto);
      return { id: generatedId };
    }
  
    @Get(':id')
    async getNotification(@Param('id') notificationId: string) {
      return await this.notificationService.getNotificationById(notificationId);
    }
  
    @Patch(':id')
    async updateNotification(
      @Param('id') notificationId: string,
      @Body() updateNotificationDto: UpdateNotificationDTO,
    ): Promise<NotificationDTO>{
      return await this.notificationService.updateNotification(notificationId, updateNotificationDto);
    }
  
    @Delete(':id')
    async removeNotification(@Param('id') notificationId: string) {
      await this.notificationService.deleteNotification(notificationId);
      return null;
    }
  }
  