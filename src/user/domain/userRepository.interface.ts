import { createUserDTO } from './user.dto';
import User from './user.entity';

export interface IUserRepository {
  create(dto: {
    nickname: string;
    email: string;
    passwordHash: string;
  }): Promise<User>;
  findByIds(ids: number[]): Promise<User[]>;
}
