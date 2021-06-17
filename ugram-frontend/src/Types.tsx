export type Picture = {
  id: string;
  pictureUrl: string;
  description: string;
  hashtags: Array<string>;
  userId: string;
  mentions: Array<string>;
  creationDate: Date;
  likes: Array<string>;
  comments;
};

export type Comment = {
  username: string;
  comment: string;
};

export type NotificationProps = {
  id: string;
};

export type User = {
  id: string;
  profilePictureUrl: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
};

export type Auth0User = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

export type Hashtag = {
  count: number;
  name: string;
};

export type Notification = {
  pictureId: string;
  pictureOwnerId: string;
  notificationUsername: string;
  notificationDate: Date;
  notificationRead: boolean;
  notificationType: string;
  pictureLink: string;
};

export interface ProfileParamTypes {
  username: string;
}

export type UploadProps = {
  user: User;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUploadWebcam: boolean;
  setShowUploadWebcam: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UploadModalProps = {
  user: User;
  showUploadModal: boolean;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUploadWebcam: boolean;
  setShowUploadWebcam: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectionType = {
  label: string;
  value: string;
  __isNew__?: boolean;
};

export type PictureUploadedInfo = {
  location: string;
};

export type ApiErrorBody = {
  message?: string | string[];
};

export type SearchPictureParams = {
  desc?: string;
  tag?: string;
};

export type ImagePreviewProps = {
  dataUri: string;
  isFullScreen: boolean;
};

export class ApiError extends Error {
  error: ApiErrorBody;

  constructor(err: ApiErrorBody) {
    super();
    this.error = err;
    this.message = this.buildMessage();
  }

  private buildMessage(): string {
    if (this.error?.message) {
      if (typeof this.error.message === 'string') {
        return this.error.message;
      } else if (Array.isArray(this.error.message)) {
        return this.error.message.join(', ');
      }
    }
    return 'The request could not be completed';
  }
}
