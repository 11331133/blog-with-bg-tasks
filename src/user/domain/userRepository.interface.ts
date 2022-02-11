import { createUserDTO } from './user.dto';
import UserEntity from './user.entity';

export interface IUserRepository {
  create(dto: {
    nickname: string;
    email: string;
    passwordHash: string;
  }): Promise<UserEntity>;
  findByIds(ids: number[]): Promise<UserEntity[]>;
  findByEmail(
    email: string,
  ): Promise<{ user: UserEntity; hashcode: string } | null>;
}
