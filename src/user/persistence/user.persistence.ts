import { InjectModel } from '@nestjs/sequelize';
import { createUserDTO } from '../domain/user.dto';
import { IUserRepository } from '../domain/userRepository.interface';
import UserModel from './user.model';
import UserEntity from '../domain/user.entity';
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
  }): Promise<UserEntity> {
    const user = new this.userModel({
      nickname,
      email,
      passwordHash,
    });

    await user.save();

    return new UserEntity({ id: user.id, nickname, email });
  }

  async findByIds(ids: number[]): Promise<UserEntity[]> {
    const userModels = await this.userModel.findAll({
      where: {
        id: ids,
      },
    });

    return userModels.map(
      (model) =>
        new UserEntity({
          id: model.id,
          nickname: model.nickname,
          email: model.email,
        }),
    );
  }

  async findByUsername(
    username: string,
  ): Promise<{ user: UserEntity; hashcode: string } | null> {
    const userModel = await this.userModel.findOne({
      where: { nickname: username },
    });

    return userModel
      ? {
          user: new UserEntity({
            id: userModel.id,
            nickname: userModel.nickname,
            email: userModel.nickname,
          }),
          hashcode: userModel.passwordHash,
        }
      : null;
  }
}
