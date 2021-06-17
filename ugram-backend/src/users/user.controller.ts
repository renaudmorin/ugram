import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../DTO/user/CreateUserDTO';
import { UpdateUserDto } from '../DTO/user/UpdateUserDTO';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    const generatedId = await this.userService.addUser(createUserDto);
    return { id: generatedId };
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
