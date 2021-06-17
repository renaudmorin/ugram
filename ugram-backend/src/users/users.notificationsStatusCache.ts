import { UsersService } from './users.service';

const cache = new Map();

const notificationsStatusCache = {
  set: (userId: string, status: boolean) => cache.set(userId, status),
  get: (userId: string) => cache.get(userId),
  createCache: async (usersService: UsersService) => {
    const users = await usersService.getAllUsers();
    users.forEach((user) => {
      notificationsStatusCache.set(user.id, false);
    });
  },
};

Object.freeze(notificationsStatusCache);
export default notificationsStatusCache;
