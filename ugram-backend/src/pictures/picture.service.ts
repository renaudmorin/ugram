import { Injectable, NotFoundException } from '@nestjs/common';

import { Picture } from './picture.model';
import { PicturePresenter } from './picture.presenter';
import { UserService } from '../users/user.service';
import { PictureRepository } from './picture.repository';
import { CreatePictureDto } from 'src/DTO/picture/CreatePictureDTO';
import { PictureDTO } from 'src/DTO/picture/PictureDTO';
import { UpdatePictureDto } from 'src/DTO/picture/UpdatePictureDTO';
import { UsersService } from '../users/users.service';
import { AddReactionDTO } from 'src/DTO/picture/AddReactionDTO';
import { RemoveReactionDTO } from 'src/DTO/picture/RemoveReactionDTO';
import { AddCommentDTO } from 'src/DTO/picture/AddCommentDTO';
import { logger } from '../utils/Logging';

@Injectable()
export class PictureService {
  constructor(
    private readonly pictureRepository: PictureRepository,
    private readonly userService: UserService,
    private readonly usersService: UsersService,
  ) {}

  async addPicture(createPictureDto: CreatePictureDto): Promise<string> {
    await this.userService.validateUserExists(createPictureDto.userId);
    await this.validateMentionsExist(createPictureDto.mentions);
    const result = await this.pictureRepository.savePicture(
      createPictureDto.pictureUrl,
      createPictureDto.userId,
      createPictureDto.description || '',
      createPictureDto.hashtags,
      createPictureDto.mentions,
      createPictureDto.creationDate,
      createPictureDto.likes,
      createPictureDto.comments,
    );
    logger.logInfo(`POST Call to /picture`);
    return result.id as string;
  }

  async getPictureById(pictureId: string): Promise<PictureDTO> {
    const picture = await this.findPicture(pictureId);
    logger.logInfo(`GET Call to /picture/${pictureId}`);
    return PicturePresenter.toDTO(picture);
  }

  async updatePicture(
    pictureId: string,
    updateDTO: UpdatePictureDto,
  ): Promise<PictureDTO> {
    const updatedPicture = await this.findPicture(pictureId);
    if (updateDTO.pictureUrl) {
      updatedPicture.pictureUrl = updateDTO.pictureUrl;
    }
    if (updateDTO.description) {
      updatedPicture.description = updateDTO.description;
    }
    if (updateDTO.hashtags) {
      updatedPicture.hashtags = updateDTO.hashtags;
    }
    if (updateDTO.mentions) {
      await this.validateMentionsExist(updateDTO.mentions);
      updatedPicture.mentions = updateDTO.mentions;
    }
    if (updateDTO.likes) {
      updatedPicture.likes = updateDTO.likes;
    }
    const updated = await this.pictureRepository.updatePicture(updatedPicture);
    logger.logInfo(`UPDATE Call to /picture/${pictureId}`);
    return PicturePresenter.toDTO(updated);
  }

  async deletePicture(pictureId: string): Promise<void> {
    const result = await this.pictureRepository.deletePicture(pictureId);
    if (result.n === 0) {
      logger.logError(
        `deletePicture: Could not find picture with id: ${pictureId}`,
      );
      throw new NotFoundException(
        'Could not find picture with id:' + pictureId,
      );
    }
    logger.logInfo(`DELETE Call to /picture/${pictureId}`);
  }

  async addReaction(
    pictureId: string,
    reactionDTO: AddReactionDTO,
  ): Promise<PictureDTO> {
    await this.usersService.validateUserExistsByUsername(reactionDTO.username);
    const updatedPicture = await this.findPicture(pictureId);

    if (
      updatedPicture.likes.findIndex(
        (username) => username === reactionDTO.username,
      ) < 0
    ) {
      updatedPicture.likes.push(reactionDTO.username);
      await this.pictureRepository.updatePicture(updatedPicture);
    }
    logger.logInfo(`POST Call to /picture/${pictureId}/reaction`);
    return PicturePresenter.toDTO(updatedPicture);
  }

  async removeReaction(
    pictureId: string,
    reactionDTO: RemoveReactionDTO,
  ): Promise<PictureDTO> {
    await this.usersService.validateUserExistsByUsername(reactionDTO.username);
    const updatedPicture = await this.findPicture(pictureId);
    const index = updatedPicture.likes.findIndex(
      (u) => u === reactionDTO.username,
    );
    if (index >= 0) {
      const filtered = updatedPicture.likes.filter(
        (u) => u !== reactionDTO.username,
      );
      updatedPicture.likes = filtered;
      await this.pictureRepository.updatePicture(updatedPicture);
    }
    logger.logInfo(`DELETE Call to /picture/${pictureId}/reaction`);
    return PicturePresenter.toDTO(updatedPicture);
  }

  async addComment(
    pictureId: string,
    addCommentDto: AddCommentDTO,
  ): Promise<PictureDTO> {
    await this.usersService.validateUserExistsByUsername(
      addCommentDto.username,
    );
    const updatedPicture = await this.findPicture(pictureId);

    updatedPicture.comments.push(addCommentDto);
    await this.pictureRepository.updatePicture(updatedPicture);
    logger.logInfo(`POST Call to /picture/${pictureId}/comment`);
    return PicturePresenter.toDTO(updatedPicture);
  }

  private async findPicture(pictureId: string): Promise<Picture> {
    let picture: Picture;
    try {
      picture = await this.pictureRepository.findById(pictureId);
    } catch (error) {
      logger.logError(
        `findPicture : Could not find picture with id: ${pictureId}`,
      );
      throw new NotFoundException(
        'Could not find picture with id:' + pictureId,
      );
    }
    if (!picture) {
      logger.logError(
        `findPicture : Could not find picture with id: ${pictureId}`,
      );
      throw new NotFoundException(
        'Could not find picture with id:' + pictureId,
      );
    }
    return picture;
  }

  private async validateMentionsExist(mentions: string[]) {
    for (const mention of mentions) {
      await this.usersService.validateUserExistsByUsername(mention);
    }
  }
}
