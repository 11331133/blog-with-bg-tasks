import { InjectModel } from '@nestjs/sequelize';
import { createUserDTO } from '../domain/user.dto';
import { IUserRepository } from '../domain/userRepository.interface';
import UserModel from './user.model';
import User from '../domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async create({
    nickname,
    email,
    passwordHash,
  }: {
    nickname: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    const user = new this.userModel({
      nickname,
      email,
      passwordHash,
    });

    await user.save();

    return new User({ id: user.id, nickname, email });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    const userModels = await this.userModel.findAll({
      where: {
        id: ids,
      },
    });

    return userModels.map(
      (model) =>
        new User({
          id: model.id,
          nickname: model.nickname,
          email: model.email,
        }),
    );
  }
}
