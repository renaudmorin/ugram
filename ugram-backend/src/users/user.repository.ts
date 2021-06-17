import { User } from './user.model';

export abstract class UserRepository {
  saveUser: (
    profilePictureUrl: string,
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    registrationDate: Date,
  ) => Promise<User>;
  findById: (userId: string) => Promise<User>;
  findByUsername: (username: string) => Promise<User>;
  findAll: (searchFilter: string) => Promise<User[]>;
  deleteUser: (userId: string) => Promise<any>;
  updateUser: (user: User) => Promise<User>;
}
