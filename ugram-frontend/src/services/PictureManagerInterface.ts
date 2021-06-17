import { PictureUploadedInfo } from '../Types';

export interface PictureManagerInterface {
  readonly region?: string;
  readonly accessKeyId?: string;
  readonly secretAccessKey?: string;
  uploadImage: (username: string, file: File) => Promise<PictureUploadedInfo>;
  uploadWebcamImage: (username: string, file: string) => Promise<string>;
  deleteImage: (username: string, pictureUrl: string) => Promise<void>;
  deleteUserFolder: (username: string) => Promise<void>;
}
