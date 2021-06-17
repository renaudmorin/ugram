import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserPresenter } from './user.presenter';
import { UserRepository } from './user.repository';
import { MongooseUserRepository } from '../infrastructure/mongoose.user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController, UserController],
  providers: [
    UsersService,
    UserService,
    UserPresenter,
    {
      provide: UserRepository,
      useClass: MongooseUserRepository,
    },
  ],
  exports: [UserService, UsersService],
})
export class UsersModule {}
