import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserPresenter } from './user.presenter';

import { User } from './user.model';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/DTO/user/CreateUserDTO';
import { UpdateUserDto } from 'src/DTO/user/UpdateUserDTO';
import { UserDTO } from 'src/DTO/user/UserDTO';
import { logger } from '../utils/Logging';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  readonly DUPLICATE_EXCEPTION_CODE = 11000;

  async addUser(createUserDto: CreateUserDto): Promise<string> {
    let result;
    try {
      result = await this.userRepository.saveUser(
        createUserDto.profilePictureUrl,
        createUserDto.username,
        createUserDto.name,
        createUserDto.email,
        createUserDto.phoneNumber || '',
        createUserDto.registrationDate,
      );
    } catch (error) {
      switch (error.code) {
        case this.DUPLICATE_EXCEPTION_CODE:
          logger.logError(`POST Call to /user:  ${error.message} `);
          throw new BadRequestException(
            'User ' + createUserDto.username + ' Already exists',
          );
        default:
          logger.logError(`POST Call to /user:  ${error.message} `);
          throw new BadRequestException(error.message);
      }
    }
    logger.logInfo(`POST Call to /user`);
    return result.id as string;
  }

  async getUserById(userId: string): Promise<UserDTO> {
    const user = await this.findUserById(userId);
    logger.logInfo(`GET Call to /user/${userId}`);
    return UserPresenter.toDTO(user);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDTO> {
    const updatedUser = await this.findUserById(userId);
    if (updateUserDto.profilePictureUrl) {
      updatedUser.profilePictureUrl = updateUserDto.profilePictureUrl;
    }
    if (updateUserDto.name) {
      updatedUser.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      updatedUser.email = updateUserDto.email;
    }
    if (updateUserDto.phoneNumber !== undefined) {
      updatedUser.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.registrationDate) {
      updatedUser.registrationDate = updateUserDto.registrationDate;
    }
    const updated = await this.userRepository.updateUser(updatedUser);
    logger.logInfo(`PATCH Call to /user/${userId}`);
    return UserPresenter.toDTO(updated);
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.deleteUser(userId);
    if (result.n === 0) {
      logger.logError(`DELETE Call to /user/${userId}: Could not find user.`);
      throw new NotFoundException('Could not find user.');
    }
    logger.logInfo(`DELETE Call to /user/${userId}`);
  }

  async validateUserExists(userId: string): Promise<void> {
    await this.findUserById(userId);
  }

  private async findUserById(userId: string): Promise<User> {
    let user;
    try {
      user = await this.userRepository.findById(userId);
    } catch (error) {
      logger.logError(`findUserById: ${error.message} `);
      throw new BadRequestException('Could not find User.');
    }
    if (!user) {
      logger.logError(`findUserById: Could not find User with id ${userId} `);
      throw new BadRequestException('Could not find User.');
    }
    return user;
  }
}
