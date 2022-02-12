import { createUserProfileDTO, editUserProfileDTO } from './user.dto';
import UserEntity from './user.entity';
import { IUserRepository } from './IUserRepository';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { IHashPassword } from 'src/utils/IHashPassword.interface';

export class UserService {
  constructor(
    private _userRepository: IUserRepository,
    private _generateId: IGenerateId,
    private _hashPassword: IHashPassword,
  ) {}

  public async createProfile(dto: createUserProfileDTO): Promise<string> {
    const userId = await this._generateId();
    const hashedPassword = await this._hashPassword(dto.password);

    const user = new UserEntity({
      id: userId,
      nickname: dto.nickname,
      email: dto.email,
      password: hashedPassword,
    });

    await this._userRepository.persist(user);
    return userId;
  }

  public async editProfile(
    dto: editUserProfileDTO,
    userId: string,
  ): Promise<void> {
    const user = await this._userRepository.findOne(userId);

    const editedProfile = new UserEntity({
      id: userId,
      nickname: dto.nickname || user.nickname,
      email: dto.email || user.email,
      password: dto.password
        ? await this._hashPassword(dto.password)
        : user.password,
    });

    await this._userRepository.merge(editedProfile);
  }

  public async findByIds(ids: string[]): Promise<UserEntity[]> {
    return await this._userRepository.findByIds(ids);
  }

  public async findOne(id: string): Promise<UserEntity> {
    return await this._userRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this._userRepository.findByEmail(email);
  }

  public async deleteOne(id: string): Promise<void> {
    return await this._userRepository.deleteOne(id);
  }
}
