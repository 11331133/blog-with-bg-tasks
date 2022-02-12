import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/controllers/user.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/domain/user.service';
import { UserPersistence } from 'src/user/persistence/userPersistence.module';
import { AuthResolver } from './auth.resolver';
import { IUserRepository } from 'src/user/domain/IUserRepository';
import { UserRepository } from 'src/user/persistence/user.repository';
import { IGenerateId } from 'src/utils/IGenerateId.interface';
import { IHashPassword } from 'src/utils/IHashPassword.interface';
import generateId from 'src/utils/GenerateId.adapter';
import hashPassword from 'src/utils/HashPassword.adapter';

@Module({
  imports: [
    UserModule,
    UserPersistence,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
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
        userRepository: IUserRepository,
        generateId: IGenerateId,
        hashPassword: IHashPassword,
      ) => new UserService(userRepository, generateId, hashPassword),
      inject: [UserRepository, generateId, hashPassword],
    },
  ],
})
export class AuthModule {}
