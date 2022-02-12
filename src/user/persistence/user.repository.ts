import { InjectModel } from '@nestjs/sequelize';
import UserModel from './user.model';
import UserEntity from '../domain/user.entity';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/IUserRepository';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async persist(user: UserEntity): Promise<void> {
    await this.userModel.create(UserMapper.mapToOrmEntityProperties(user));
  }

  async merge(user: UserEntity): Promise<void> {
    await this.userModel.update(UserMapper.mapToOrmEntityProperties(user), {
      where: { id: user.id },
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.findByIds([id]).then((users) => users.shift());
  }

  async findByIds(ids: string[]): Promise<UserEntity[]> {
    const userModels = await this.userModel.findAll({
      where: {
        id: ids,
      },
    });

    return userModels.map(UserMapper.mapToDomainEntity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userModel = await this.userModel.findOne({
      where: { email },
    });

    return userModel ? UserMapper.mapToDomainEntity(userModel) : null;
  }

  async deleteOne(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
