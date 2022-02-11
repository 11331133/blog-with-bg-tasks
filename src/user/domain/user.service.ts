import { createUserDTO } from './user.dto';
import UserEntity from './user.entity';
import { IUserRepository } from './userRepository.interface';

export class UserService {
  constructor(private readonly _userRepository: IUserRepository) {}

  public async create({
    nickname,
    email,
    password,
  }: createUserDTO): Promise<UserEntity> {
    return await this._userRepository.create({
      nickname,
      email,
      passwordHash: 'hashed ' + password,
    });
  }

  public async findByIds(ids: number[]): Promise<UserEntity[]> {
    return await this._userRepository.findByIds(ids);
  }

  public async findByEmail(
    email: string,
  ): Promise<{ user: UserEntity; hashcode: string } | null> {
    return await this._userRepository.findByEmail(email);
  }
}
