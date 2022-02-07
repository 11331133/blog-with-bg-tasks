import { createUserDTO } from './user.dto';
import User from './user.entity';
import { IUserRepository } from './userRepository.interface';

export class UserService {
  constructor(private readonly _userRepository: IUserRepository) {}

  public async create({
    nickname,
    email,
    password,
  }: createUserDTO): Promise<User> {
    return await this._userRepository.create({
      nickname,
      email,
      passwordHash: 'hashed ' + password,
    });
  }

  public async findByIds(ids: number[]): Promise<User[]> {
    return await this._userRepository.findByIds(ids);
  }
}
