import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PictureService } from './picture.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePictureDto } from '../DTO/picture/CreatePictureDTO';
import { UpdatePictureDto } from '../DTO/picture/UpdatePictureDTO';
import { AddReactionDTO } from 'src/DTO/picture/AddReactionDTO';
import { PictureDTO } from 'src/DTO/picture/PictureDTO';
import { RemoveReactionDTO } from 'src/DTO/picture/RemoveReactionDTO';
import { AddCommentDTO } from 'src/DTO/picture/AddCommentDTO';

@ApiTags('Picture')
@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  async addPicture(@Body() createPictureDto: CreatePictureDto) {
    const generatedId = await this.pictureService.addPicture(createPictureDto);
    return { id: generatedId };
  }

  @Get(':id')
  getPicture(@Param('id') pictureId: string) {
    return this.pictureService.getPictureById(pictureId);
  }

  @Patch(':id')
  async updatePicture(
    @Param('id') pictureId: string,
    @Body() updatePictureDto: UpdatePictureDto,
  ): Promise<PictureDTO> {
    return await this.pictureService.updatePicture(pictureId, updatePictureDto);
  }

  @Delete(':id')
  async removePicture(@Param('id') pictureId: string) {
    await this.pictureService.deletePicture(pictureId);
    return null;
  }

  @Post(':id/reaction')
  async addReaction(
    @Param('id') pictureId: string,
    @Body() addReactionDto: AddReactionDTO,
  ): Promise<PictureDTO> {
    return await this.pictureService.addReaction(pictureId, addReactionDto);
  }

  @Delete(':id/reaction')
  async removeReaction(
    @Param('id') pictureId: string,
    @Body() removeReactionDto: RemoveReactionDTO,
  ): Promise<PictureDTO> {
    return await this.pictureService.removeReaction(
      pictureId,
      removeReactionDto,
    );
  }

  @Post(':id/comment')
  async addComment(
    @Param('id') pictureId: string,
    @Body() addCommentDto: AddCommentDTO,
  ): Promise<PictureDTO> {
    return await this.pictureService.addComment(pictureId, addCommentDto);
  }
}
