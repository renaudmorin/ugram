import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { ApiTags } from '@nestjs/swagger';
import { logger } from '../utils/Logging';
import { GetMatchingDescriptionsDTO } from 'src/DTO/picture/GetMatchingDescriptionsDTO';
import { GetMatchingHashtagsDTO } from 'src/DTO/picture/GetMatchingHastagsDTO';

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get()
  async getAllPictures(
    @Query('desc') desc?: string,
    @Query('tag') tags?: string,
  ) {
    return await this.picturesService.getAllPictures(desc, tags);
  }
  @Get('matchingdescriptions/')
  async getMatchingDescriptions(@Query() params: GetMatchingDescriptionsDTO) {
    return await this.picturesService.getMatchingDescriptions(
      params.desc,
      Number.parseInt(params.limit),
    );
  }
  @Get('matchinghashtags/')
  async getMatchingHashtags(@Query() params: GetMatchingHashtagsDTO) {
    return await this.picturesService.getMatchingHashtags(
      params.hashtag,
      Number.parseInt(params.limit),
    );
  }

  @Get(':userId')
  getUsers(
    @Param('userId') userId: string,
    @Query('desc') desc?: string,
    @Query('tag') tags?: string,
  ) {
    return this.picturesService.getPicturesByUserId(userId, desc, tags);
  }
  @Delete(':userId')
  deleteAllPictures(@Param('userId') userId: string) {
    return this.picturesService.deleteAllPicturesForUserId(userId);
  }
  @Get('hashtags/:limit')
  async getMostPopularPictureHashtags(@Param('limit') limit: string) {
    if (Number.isInteger(parseInt(limit)) && parseInt(limit) > 0) {
      logger.logInfo(`GET Call to /pictures/hashtags/${limit}`);
      return await this.picturesService.getMostPopularPictureHashtags(
        parseInt(limit),
      );
    } else {
      logger.logError(
        `getMostPopularPictureHashtags : The limit has to be a positive integer`,
      );
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The limit has to be a positive integer',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
