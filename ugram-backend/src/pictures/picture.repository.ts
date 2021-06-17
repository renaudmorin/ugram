import { Picture } from './picture.model';
import { Comment } from 'src/DTO/picture/comment.model';

export abstract class PictureRepository {
  savePicture: (
    pictureUrl: string,
    userId: string,
    description: string,
    hashtags: string[],
    mentions: string[],
    creationDate: Date,
    likes: string[],
    comments: Comment[],
  ) => Promise<Picture>;
  findById: (pictureId: string) => Promise<Picture>;
  findAll: (
    userId: string,
    searchDescription?: string,
    searchHashtag?: string,
  ) => Promise<Picture[]>;
  getMatchingDescriptions: (
    searchDescription?: string,
    limit?: number,
  ) => Promise<any[]>;
  getMatchingHashtags: (
    searchHashtag?: string,
    limit?: number,
  ) => Promise<any[]>;
  deletePicture: (pictureId: string) => Promise<any>;
  updatePicture: (picture: Picture) => Promise<Picture>;
  deleteMany: (userId: string) => Promise<any>;
  getMostPopularPictureHashtags: (limit: number) => Promise<any>;
}
