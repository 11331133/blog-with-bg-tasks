import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserPersistence {}
