import { Comment } from 'src/DTO/picture/comment.model';

export class PictureDTO {
  readonly id: string;
  readonly pictureUrl: string;
  readonly userId: string;
  readonly description: string;
  readonly hashtags: string[];
  readonly mentions: string[];
  readonly creationDate: Date;
  readonly likes: string[];
  readonly comments: Comment[];

  constructor(
    id: string,
    pictureUrl: string,
    userId: string,
    description: string,
    hashtags: string[],
    mentions: string[],
    creationDate: Date,
    likes: string[],
    comments: Comment[],
  ) {
    this.id = id;
    this.pictureUrl = pictureUrl;
    this.userId = userId;
    this.description = description;
    this.hashtags = hashtags;
    this.mentions = mentions;
    this.creationDate = creationDate;
    this.likes = likes;
    this.comments = comments;
  }
}
