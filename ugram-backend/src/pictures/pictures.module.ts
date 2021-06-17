import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PictureSchema } from './picture.model';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { PicturePresenter } from './picture.presenter';
import { UsersModule } from 'src/users/users.module';
import { MongoosePictureRepository } from '../infrastructure/mongoose.picture.repository';
import { PictureRepository } from './picture.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Picture', schema: PictureSchema }]),
    UsersModule,
  ],
  controllers: [PictureController, PicturesController],
  providers: [
    PictureService,
    PicturesService,
    PicturePresenter,
    {
      provide: PictureRepository,
      useClass: MongoosePictureRepository,
    },
  ],
})
export class PicturesModule {}
