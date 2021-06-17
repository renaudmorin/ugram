export class NotificationDTO {
    id: string;
    pictureId: string;
    pictureOwnerId: string;
    notificationUsername: string;
    notificationDate: Date;
    notificationRead: Boolean;
    notificationType: string;
    pictureLink: string;
  
    constructor(
      id: string,
      pictureId: string,
      pictureOwnerId: string,
      notificationUsername: string,
      notificationDate: Date,
      notificationRead: Boolean,
      notificationType: string,
      pictureLink: string,
    ) {
      this.id = id;
      this.pictureId = pictureId;
      this.pictureOwnerId = pictureOwnerId;
      this.notificationUsername = notificationUsername;
      this.notificationDate = notificationDate;
      this.notificationRead = notificationRead;
      this.notificationType = notificationType;
      this.pictureLink = pictureLink;
    }
  }
  