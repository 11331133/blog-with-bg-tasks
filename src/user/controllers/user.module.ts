import { Module } from '@nestjs/common';
import { IUserRepository } from '../domain/IUserRepository';
import { UserService } from '../domain/user.service';
import { UserPersistence } from '../persistence/userPersistence.module';
import { UserResolver } from './user.resolver';
import { UserRepository } from '../persistence/user.repository';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { IHashPassword } from 'src/utils/IHashPassword.interface';
import generateId from 'src/utils/GenerateId.adapter';
import hashPassword from 'src/utils/HashPassword.adapter';

@Module({
  imports: [UserPersistence],
  providers: [
    UserResolver,
    {
      provide: generateId,
      useValue: generateId,
    },
    {
      provide: hashPassword,
      useValue: hashPassword,
    },
    {
      provide: UserService,
      useFactory: (
        user: IUserRepository,
        generateId: IGenerateId,
        hashPassword: IHashPassword,
      ) => new UserService(user, generateId, hashPassword),
      inject: [UserRepository, generateId, hashPassword],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
