import {
    IsBoolean
  } from 'class-validator';
  
  export class UpdateNotificationDTO {
    @IsBoolean({ message: 'The provided notificationRead is invalid' })
    notificationRead: Boolean;
  }
  