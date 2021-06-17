import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from 'src/DTO/user/UserDTO';

import { UserPresenter } from './user.presenter';
import { UserRepository } from './user.repository';
import { logger } from '../utils/Logging';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(searchFilter?: string): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll(searchFilter);
    logger.logInfo('Call to /users');
    return users.map((user) => UserPresenter.toDTO(user));
  }

  async getUserByUsername(username: string): Promise<UserDTO> {
    let user;
    try {
      user = await this.userRepository.findByUsername(username);
    } catch (error) {
      logger.logError(`getUserByUserName: ${error.message} `);
      throw new NotFoundException(`Could not find User: ${username}.`);
    }
    if (!user) {
      logger.logError(
        `getUserByUserName: Could not find User with username: ${username}`,
      );
      throw new NotFoundException(`Could not find User: ${username}.`);
    }
    logger.logInfo(`Call to /users/${username}`);
    return UserPresenter.toDTO(user);
  }

  async validateUserExistsByUsername(userName: string) {
    await this.getUserByUsername(userName);
  }
}
