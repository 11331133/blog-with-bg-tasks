import UserEntity from '../domain/user.entity';
import UserModel from './user.model';

export class UserMapper {
  public static mapToOrmEntityProperties(domainEntity: UserEntity) {
    return {
      id: domainEntity.id,
      nickname: domainEntity.nickname,
      email: domainEntity.nickname,
      passwordHash: domainEntity.password,
    };
  }

  public static mapToDomainEntity(ormEntity: UserModel) {
    return new UserEntity({
      id: ormEntity.id,
      nickname: ormEntity.nickname,
      email: ormEntity.email,
      password: ormEntity.passwordHash,
    });
  }
}
