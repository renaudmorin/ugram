import {
  Controller,
  Get,
  Param,
  Query,
  MessageEvent,
  Res,
  Sse,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import notificationsStatusCache from './users.notificationsStatusCache';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    notificationsStatusCache.createCache(this.usersService);
  }

  @Get()
  async getAllUsers(@Query('search') searchFilter: string) {
    return await this.usersService.getAllUsers(searchFilter);
  }

  @Get(':username')
  async getUsers(@Param('username') username: string) {
    return await this.usersService.getUserByUsername(username);
  }

  @Sse('notifications/:userId')
  sse(@Param('userId') userId: string): Observable<MessageEvent> {
    return interval(5000).pipe(
      map((_) => ({
        data: { newNotifications: notificationsStatusCache.get(userId) },
      })),
    );
  }
}
