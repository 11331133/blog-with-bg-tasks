import { createUserDTO } from './user.dto';
import User from './user.entity';

export interface IUserRepository {
  create(dto: createUserDTO, authorNickname: string): Promise<User>;
  findByIds(ids: number[]): Promise<User[]>;
}
