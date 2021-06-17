import { PictureRepository } from '../pictures/picture.repository';
import { Picture } from '../pictures/picture.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Filter } from '../utils/Filter';
import { Comment } from 'src/DTO/picture/comment.model';

const DefaultMatchingResultsLimit = 10;

@Injectable()
export class MongoosePictureRepository implements PictureRepository {
  constructor(
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>,
  ) {}

  deletePicture(pictureId: string): Promise<any> {
    return this.pictureModel.deleteOne({ _id: pictureId }).exec();
  }

  deleteMany(userId: string): Promise<any> {
    return this.pictureModel.deleteMany({ userId: userId }).exec();
  }

  findById(pictureId: string): Promise<Picture> {
    return this.pictureModel.findById(pictureId).exec();
  }

  savePicture(
    pictureUrl: string,
    userId: string,
    description: string,
    hashtags: string[],
    mentions: string[],
    creationDate: Date,
    likes: string[],
    comments: Comment[],
  ): Promise<Picture> {
    const newPicture = new this.pictureModel({
      pictureUrl,
      userId,
      description,
      hashtags,
      mentions,
      creationDate,
      likes,
      comments,
    });
    return newPicture.save();
  }

  updatePicture(picture: Picture): Promise<Picture> {
    return picture.save();
  }

  findAll(
    userId: string,
    searchDescription?: string,
    searchHashtag?: string,
  ): Promise<Picture[]> {
    const descFilterRegex = Filter.toCaseInsensitiveRegExp(searchDescription);
    const hashtagFilterRegex = Filter.toCaseInsensitiveRegExp(searchHashtag, {
      exact: true,
    });
    return this.pictureModel
      .find(userId ? { userId: userId } : {})
      .find(descFilterRegex ? { description: descFilterRegex } : {})
      .find(
        hashtagFilterRegex ? { hashtags: { $in: [hashtagFilterRegex] } } : {},
      )
      .exec();
  }

  getMatchingDescriptions(
    searchDescription?: string,
    limit?: number,
  ): Promise<any[]> {
    const filterRegex = Filter.toCaseInsensitiveRegExp(searchDescription);
    const limitArg = limit || DefaultMatchingResultsLimit;
    return this.pictureModel
      .aggregate()
      .match({ description: new RegExp(filterRegex) })
      .group({
        _id: { desc: { $toLower: '$description' } },
        description: { $first: '$description' },
      })
      .limit(limitArg)
      .project({ _id: 0, description: '$description' })
      .exec();
  }

  getMatchingHashtags(searchHashtag?: string, limit?: number): Promise<any[]> {
    const filterRegex = Filter.toCaseInsensitiveRegExp(searchHashtag);
    const limitArg = limit || DefaultMatchingResultsLimit;
    return this.pictureModel
      .aggregate()
      .unwind('$hashtags')
      .match({ hashtags: new RegExp(filterRegex) })
      .group({
        _id: { tag: { $toLower: '$hashtags' } },
        hashtag: { $first: '$hashtags' },
      })
      .limit(limitArg)
      .project({ _id: 0, hashtag: '$hashtag' })
      .exec();
  }

  getMostPopularPictureHashtags(limit: number): Promise<any> {
    return this.pictureModel
      .aggregate([
        {
          $unwind: '$hashtags',
        },
        {
          $group: {
            _id: { $toLower: '$hashtags' },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            count: 1,
          },
        },
      ])
      .exec();
  }
}
