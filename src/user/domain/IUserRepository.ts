import IBaseRepository from 'src/utils/IBaseRepository.interface';
import UserEntity from './user.entity';

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}
