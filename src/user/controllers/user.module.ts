import { Module } from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { IUserRepository } from '../domain/userRepository.interface';
import { UserRepository } from '../persistence/user.persistence';
import { UserPersistence } from '../persistence/userPersistence.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UserPersistence],
  providers: [
    UserResolver,
    {
      provide: UserService,
      useFactory: (user: IUserRepository) => new UserService(user),
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
