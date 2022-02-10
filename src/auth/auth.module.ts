import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/controllers/user.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/domain/user.service';
import { IUserRepository } from 'src/user/domain/userRepository.interface';
import { UserRepository } from 'src/user/persistence/user.persistence';
import { UserPersistence } from 'src/user/persistence/userPersistence.module';

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
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: UserService,
      useFactory: (userRepository: IUserRepository) =>
        new UserService(userRepository),
      inject: [UserRepository],
    },
  ],
})
export class AuthModule {}
