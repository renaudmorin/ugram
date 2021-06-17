import { Injectable } from '@nestjs/common';
import { PictureDTO } from 'src/DTO/picture/PictureDTO';
import { PicturePresenter } from './picture.presenter';
import { PictureRepository } from './picture.repository';
import { logger } from '../utils/Logging';

@Injectable()
export class PicturesService {
  constructor(private readonly pictureRepository: PictureRepository) {}
  async getAllPictures(
    searchDescription?: string,
    searchHashtag?: string,
  ): Promise<PictureDTO[]> {
    const pictures = await this.pictureRepository.findAll(
      null,
      searchDescription,
      searchHashtag,
    );
    logger.logInfo(`GET Call to /pictures`);
    return pictures.map((picture) => PicturePresenter.toDTO(picture));
  }

  async getMatchingDescriptions(
    searchDescription?: string,
    limit?: number,
  ): Promise<string[]> {
    const results = await this.pictureRepository.getMatchingDescriptions(
      searchDescription,
      limit,
    );
    logger.logInfo(`GET Call to /pictures/matchingdescriptions/`);
    return results.map((r) => r['description']);
  }

  async getMatchingHashtags(
    searchHashtag?: string,
    limit?: number,
  ): Promise<string[]> {
    const results = await this.pictureRepository.getMatchingHashtags(
      searchHashtag,
      limit,
    );
    logger.logInfo(`GET Call to /pictures/matchinghashtags/`);
    return results.map((r) => r['hashtag']);
  }

  async getPicturesByUserId(
    userId: string,
    searchDescription?: string,
    searchHashtag?: string,
  ): Promise<PictureDTO[]> {
    const pictures = await this.pictureRepository.findAll(
      userId,
      searchDescription,
      searchHashtag,
    );
    logger.logInfo(`GET Call to /pictures/${userId}`);
    return pictures.map((picture) => PicturePresenter.toDTO(picture));
  }

  async deleteAllPicturesForUserId(userId: string) {
    await this.pictureRepository.deleteMany(userId);
    logger.logInfo(`DELETE Call to /pictures/${userId}`);
  }

  async getMostPopularPictureHashtags(limit: number) {
    return await this.pictureRepository.getMostPopularPictureHashtags(limit);
  }
}
