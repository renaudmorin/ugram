import { UserRepository } from '../users/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.model';
import { Injectable } from '@nestjs/common';
import { Filter } from '../utils/Filter';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  deleteUser(userId: string): Promise<any> {
    return this.userModel.deleteOne({ _id: userId }).exec();
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  saveUser(
    profilePictureUrl: string,
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    registrationDate: Date,
  ): Promise<User> {
    const newUser = new this.userModel({
      profilePictureUrl,
      username,
      name,
      email,
      phoneNumber,
      registrationDate,
    });
    return newUser.save();
  }

  updateUser(user: User): Promise<User> {
    return user.save();
  }

  findAll(searchFilter: string): Promise<User[]> {
    const filterRegex = Filter.toCaseInsensitiveRegExp(searchFilter);
    return this.userModel
      .find(filterRegex ? { username: filterRegex } : {})
      .exec();
  }

  findByUsername(username: string): Promise<User> {
    const regex = new RegExp(`^${username || ''}$`, 'i');
    return this.userModel.findOne({ username: regex }).exec();
  }
}
